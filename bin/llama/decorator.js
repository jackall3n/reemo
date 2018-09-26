"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANNOTATIONS = '__annotations__';
exports.PARAMETERS = '__paramaters__';
exports.PROP_METADATA = '__prop__metadata__';
function makeDecorator(name, props, parentClass, chainFn, typeFn) {
    const metaConstructor = makeMetaConstructor(props);
    function DecoratorFactory(...args) {
        if (this instanceof DecoratorFactory) {
            metaConstructor.call(this, ...args);
            return this;
        }
        const annotationInstance = new DecoratorFactory(...args);
        const TypeDecorator = (cls) => {
            typeFn && typeFn(cls, ...args);
            const annotations = cls.hasOwnProperty(exports.ANNOTATIONS)
                ? cls[exports.ANNOTATIONS]
                : Object.defineProperty(cls, exports.ANNOTATIONS, { value: [] })[exports.ANNOTATIONS];
            annotations.push(annotationInstance);
            return cls;
        };
        chainFn && chainFn(TypeDecorator);
        return TypeDecorator;
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.annotationCls = DecoratorFactory;
    return DecoratorFactory;
}
exports.makeDecorator = makeDecorator;
function makeMetaConstructor(props) {
    return function metaConstructor(...args) {
        if (props) {
            const values = props(...args);
            for (const propName in values) {
                if (values.hasOwnProperty(propName)) {
                    this[propName] = values[propName];
                }
            }
        }
    };
}
exports.makeMetaConstructor = makeMetaConstructor;
function makePropDecorator(name, props, parentClass) {
    const metaCtor = makeMetaConstructor(props);
    function PropDecoratorFactory(...args) {
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        const decoratorInstance = new PropDecoratorFactory(...args);
        return function PropDecorator(target, name) {
            const constructor = target.constructor;
            const meta = constructor.hasOwnProperty(exports.PROP_METADATA) ?
                constructor[exports.PROP_METADATA] :
                Object.defineProperty(constructor, exports.PROP_METADATA, { value: {} })[exports.PROP_METADATA];
            meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
            meta[name].unshift(decoratorInstance);
        };
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}
exports.makePropDecorator = makePropDecorator;
