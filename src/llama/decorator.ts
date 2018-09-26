import {Type} from "./type";

export interface TypeDecorator {
    <T extends Type<any>>(type: T) : T;
    <T>(target: Object, propertyKey?: string|symbol, descriptor?: TypedPropertyDescriptor<T>): void;
}

export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__paramaters__';
export const PROP_METADATA = '__prop__metadata__';

export interface DecoratorResult {
    new (...args: any[]): any;

    (...args: any[]): any;

    (...args: any[]): (cls: any) => any;
}

export function makeDecorator(
    name: string,
    props?: (...args: any[]) => any,
    parentClass?: any,
    chainFn?: (fn: Function) => void,
    typeFn?: (type: Type<any>, ...args: any[]) => void): DecoratorResult {

    const metaConstructor = makeMetaConstructor(props);

    function DecoratorFactory(...args: any[]): (cls: any) => any {
        if (this instanceof DecoratorFactory) {
            metaConstructor.call(this, ...args);
            return this;
        }

        const annotationInstance = new (<any>DecoratorFactory)(...args);
        const TypeDecorator: TypeDecorator = (cls: Type<any>) => {

            typeFn && typeFn(cls, ...args);

            const annotations = cls.hasOwnProperty(ANNOTATIONS)
                ? (cls as any)[ANNOTATIONS]
                : Object.defineProperty(cls, ANNOTATIONS, {value: []})[ANNOTATIONS];

            annotations.push(annotationInstance);

            return cls;
        };

        chainFn && chainFn(TypeDecorator);

        return TypeDecorator;
    }

    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }

    (<any>DecoratorFactory).annotationCls = DecoratorFactory;
    return DecoratorFactory as any;
}

export function makeMetaConstructor(props?: (...args: any[]) => any) {
    return function metaConstructor(...args: any[]) {
        if (props) {
            const values = props(...args);

            for (const propName in values) {
                if (values.hasOwnProperty(propName)) {
                    this[propName] = values[propName];
                }
            }

        }
    }
}

export function makePropDecorator(
    name: string, props?: (...args: any[]) => any, parentClass?: any): any {
    const metaCtor = makeMetaConstructor(props);

    function PropDecoratorFactory(...args: any[]): any {
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }

        const decoratorInstance = new (<any>PropDecoratorFactory)(...args);

        return function PropDecorator(target: any, name: string) {
            const constructor = target.constructor;

            const meta = constructor.hasOwnProperty(PROP_METADATA) ?
                (constructor as any)[PROP_METADATA] :
                Object.defineProperty(constructor, PROP_METADATA, {value: {}})[PROP_METADATA];
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
        };
    }

    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }

    (<any>PropDecoratorFactory).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}