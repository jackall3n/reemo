import 'reflect-metadata';
import {Type} from "../llama";

export const Injector = new class {
    protected services: Map<string, Type<any>> = new Map<string, Type<any>>();

    resolve<T>(target: Type<any>): T {
        let injectables = Reflect.getMetadata("design:paramtypes", target) || [];
        let resolvedInjectables = (<[any]>injectables).map(token => Injector.resolve<any>(token));

        return new target(...resolvedInjectables);
    }

    set(target: Type<any>) {
        this.services.set(target.name, target);
    }
};