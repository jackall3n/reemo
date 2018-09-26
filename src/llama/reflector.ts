import {ReflectionCapabilities} from "./reflector_capabilities";
import {Type} from "./type";

export class Reflector {
    constructor(private capabilities: ReflectionCapabilities) {

    }

    annotations(typeOrFunc: Type<any>): any[] {
        return this.capabilities.annotations(typeOrFunc);
    }

    propMetadata(typeOrFunc: Type<any>): { [key: string]: any[] } {
        return this.capabilities.propMetadata(typeOrFunc)
    }
}