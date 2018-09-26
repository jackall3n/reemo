import {AuthController} from "./auth.controller";
import { RootController}  from './root.controller';

let routes: any[] = [{
    path: '/',
    controller: RootController
},{
    path: "/auth",
    controller: AuthController
}];

export default routes;