import {Type} from "./type";
import {makeDecorator, TypeDecorator} from "./decorator";

export interface ServerDecorator {
    (s: Server) : TypeDecorator;
    new (s: Server) : Server;
}

export interface Server {
    mainModule: Type<any>
}

export const Server : ServerDecorator = makeDecorator('Server', (s: Server) => ({...s}));