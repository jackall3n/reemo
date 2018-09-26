import {Service, Type} from "../llama";
import * as e from "express";
import {reflector} from "../llama/reflection";
import {Injector} from "./injector.service";
import AppModule from "../app.module";
import * as passport from "passport";

@Service()
export default class RouteService {
    static init(appModule: Type<any>): e.Router {
        let module = reflector.annotations(appModule);
        let router = e.Router();

        for (let route of module[0].routes) {
            let methods = reflector.propMetadata(route.controller);

            let controller = Injector.resolve(route.controller);

            let method_router = <any>e.Router({mergeParams: true});

            for (let method_name in methods) {
                let method_config = methods[method_name][0];

                let method_type = method_config.method.toLowerCase();
                let method_body = (<any>controller)[method_name];

                let method_arguments = [
                    method_config.path,
                    (...args: any[]) => method_body.apply(controller, args)
                ];

                if (method_config.authorise) {
                    method_arguments.splice(1, 0, passport.authenticate('jwt', {session: false}))
                }

                method_router[method_type].apply(method_router, method_arguments);
            }

            router.use(route.path, method_router);
        }

        return router;
    }
}