"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reflector {
    constructor(capabilities) {
        this.capabilities = capabilities;
    }
    annotations(typeOrFunc) {
        return this.capabilities.annotations(typeOrFunc);
    }
    propMetadata(typeOrFunc) {
        return this.capabilities.propMetadata(typeOrFunc);
    }
}
exports.Reflector = Reflector;
