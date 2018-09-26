"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth.controller");
const root_controller_1 = require("./root.controller");
const lists_controller_1 = require("./lists.controller");
const tasks_controller_1 = require("./tasks.controller");
let routes = [{
        path: '/',
        controller: root_controller_1.RootController
    }, {
        path: "/auth",
        controller: auth_controller_1.AuthController
    }, {
        path: "/lists",
        controller: lists_controller_1.ListsController
    }, {
        path: "/tasks",
        controller: tasks_controller_1.TasksController
    }];
exports.default = routes;
