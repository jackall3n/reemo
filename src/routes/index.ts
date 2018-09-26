import {AuthController} from "./auth.controller";
import {RootController} from './root.controller';
import {ListsController} from "./lists.controller";
import {TasksController} from "./tasks.controller";

let routes: any[] = [{
    path: '/',
    controller: RootController
}, {
    path: "/auth",
    controller: AuthController
}, {
    path: "/lists",
    controller: ListsController
}, {
    path: "/tasks",
    controller: TasksController
}];

export default routes;