import {Type} from "./type";
import {makeDecorator, TypeDecorator} from "./decorator";

export type Routes = [Route];

export interface Route {
    path?: string;
    controller?: Type<any>;
}

export interface RouteDecorator {
    (obj: Route): TypeDecorator;

    new (obj: Route): Route;
}

export const Route: RouteDecorator = makeDecorator('Route', (r: Route = {}) => r);