import {makeDecorator, TypeDecorator} from "./decorator";

export interface ModuleDecorator {
    (obj: Module): TypeDecorator;
    new (obj: Module): Module;
}

export interface Module {
    routes?: any
}

export const Module : ModuleDecorator
    = makeDecorator('Module', (m: Module) => ({...m}));