import {makePropDecorator, TypeDecorator} from "./decorator";

export interface GetDecorator {
    (g: Get): TypeDecorator

    new (g: Get): Get
}

export interface Get {
    path: string;
    authorise?: boolean
}

export const Get: GetDecorator = makePropDecorator('Get', (g: Get) => ({method: "GET", ...g}));