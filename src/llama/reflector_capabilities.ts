import {isType, Type} from "./type";
import {ANNOTATIONS, PROP_METADATA} from "./decorator";

export class ReflectionCapabilities {

    private _ownAnnotations(typeOrFunc: Type<any>, parentCtor: any): any[] | null {
        let tof = (<any>typeOrFunc);

        if (tof.annotations && tof.annotations !== parentCtor.annotations) {
            let annotations = tof.annotations;
            if (typeof annotations === "function" && annotations.annotations) {
                annotations = annotations.annotations;
            }

            return annotations;
        }

        if (tof.decorators && tof.decorators !== parentCtor.decorators) {
            return this._convert(tof.decorators)
        }

        if (tof.hasOwnProperty(ANNOTATIONS)) {
            return tof[ANNOTATIONS];
        }

        return null;
    }

    annotations(typeOrFunc: Type<any>): any[] {
        if (!isType(typeOrFunc)) {
            return [];
        }

        const parentCtor = this._getParentCtor(typeOrFunc);
        const ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
        const parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
        return parentAnnotations.concat(ownAnnotations)
    }

    private _ownPropMetadata(typeOrFunc: any, parentCtor: any): { [key: string]: any[] } {
        let tof = (<any>typeOrFunc);

        if (tof.propMetadata && tof.propMetadata !== parentCtor.propMetadata) {
            let propMetadata = tof.propMetadata;

            if (typeof  propMetadata === "function" && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }

            return propMetadata;
        }

        if (tof.propDecorators && tof.propDecorators !== parentCtor.propDecorators) {
            const propDecorators = tof.propDecorators;
            const propMetadata = <{ [key: string]: any[] }>{};
            Object.keys(propDecorators).forEach(prop => {
                propMetadata[prop] = this._convert(propDecorators[prop]);
            });

            return propMetadata;
        }

        if (tof.hasOwnProperty(PROP_METADATA)) {
            return tof[PROP_METADATA];
        }

        return null;
    }

    propMetadata(typeOrFunc: any): { [key: string]: any[] } {
        if (!isType(typeOrFunc)) {
            return {}
        }

        const parentCtor = this._getParentCtor(typeOrFunc);
        const propMetadata: { [key: string]: any[] } = {};

        if (parentCtor !== Object) {
            const parentPropMetadata = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata).forEach(propName => {
                propMetadata[propName] = parentPropMetadata[propName];
            })
        }

        const ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach(propName => {
                const decorators: any[] = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push(...propMetadata[propName]);
                }

                decorators.push(...ownPropMetadata[propName]);
                propMetadata[propName] = decorators
            })
        }

        return propMetadata;
    }

    private _convert(decorators: any[]): any[] {
        if (!decorators) {
            return [];
        }

        return decorators.map(decorator => {
            const decoratorType = decorator.type;
            const annotationCls = decoratorType.annotationCls;
            const annotationArgs = decorator.args || [];
            return new annotationCls(...annotationArgs)
        })

    }

    _getParentCtor(ctor: Function): Type<any> {
        const parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
        const parentCtor = parentProto ? parentProto.constructor : null;

        return parentCtor || Object;
    }
}