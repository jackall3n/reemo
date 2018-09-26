"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
exports.Injector = new class {
    constructor() {
        this.services = new Map();
    }
    resolve(target) {
        let injectables = Reflect.getMetadata("design:paramtypes", target) || [];
        let resolvedInjectables = injectables.map(token => exports.Injector.resolve(token));
        return new target(...resolvedInjectables);
    }
    set(target) {
        this.services.set(target.name, target);
    }
};
