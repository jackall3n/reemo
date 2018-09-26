"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const decorator_1 = require("./decorator");
class ReflectionCapabilities {
    _ownAnnotations(typeOrFunc, parentCtor) {
        let tof = typeOrFunc;
        if (tof.annotations && tof.annotations !== parentCtor.annotations) {
            let annotations = tof.annotations;
            if (typeof annotations === "function" && annotations.annotations) {
                annotations = annotations.annotations;
            }
            return annotations;
        }
        if (tof.decorators && tof.decorators !== parentCtor.decorators) {
            return this._convert(tof.decorators);
        }
        if (tof.hasOwnProperty(decorator_1.ANNOTATIONS)) {
            return tof[decorator_1.ANNOTATIONS];
        }
        return null;
    }
    annotations(typeOrFunc) {
        if (!type_1.isType(typeOrFunc)) {
            return [];
        }
        const parentCtor = this._getParentCtor(typeOrFunc);
        const ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
        const parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
        return parentAnnotations.concat(ownAnnotations);
    }
    _ownPropMetadata(typeOrFunc, parentCtor) {
        let tof = typeOrFunc;
        if (tof.propMetadata && tof.propMetadata !== parentCtor.propMetadata) {
            let propMetadata = tof.propMetadata;
            if (typeof propMetadata === "function" && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }
        if (tof.propDecorators && tof.propDecorators !== parentCtor.propDecorators) {
            const propDecorators = tof.propDecorators;
            const propMetadata = {};
            Object.keys(propDecorators).forEach(prop => {
                propMetadata[prop] = this._convert(propDecorators[prop]);
            });
            return propMetadata;
        }
        if (tof.hasOwnProperty(decorator_1.PROP_METADATA)) {
            return tof[decorator_1.PROP_METADATA];
        }
        return null;
    }
    propMetadata(typeOrFunc) {
        if (!type_1.isType(typeOrFunc)) {
            return {};
        }
        const parentCtor = this._getParentCtor(typeOrFunc);
        const propMetadata = {};
        if (parentCtor !== Object) {
            const parentPropMetadata = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata).forEach(propName => {
                propMetadata[propName] = parentPropMetadata[propName];
            });
        }
        const ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach(propName => {
                const decorators = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push(...propMetadata[propName]);
                }
                decorators.push(...ownPropMetadata[propName]);
                propMetadata[propName] = decorators;
            });
        }
        return propMetadata;
    }
    _convert(decorators) {
        if (!decorators) {
            return [];
        }
        return decorators.map(decorator => {
            const decoratorType = decorator.type;
            const annotationCls = decoratorType.annotationCls;
            const annotationArgs = decorator.args || [];
            return new annotationCls(...annotationArgs);
        });
    }
    _getParentCtor(ctor) {
        const parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
        const parentCtor = parentProto ? parentProto.constructor : null;
        return parentCtor || Object;
    }
}
exports.ReflectionCapabilities = ReflectionCapabilities;
