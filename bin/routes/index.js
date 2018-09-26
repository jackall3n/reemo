"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("./auth.controller");
const root_controller_1 = require("./root.controller");
let routes = [{
        path: '/',
        controller: root_controller_1.RootController
    }, {
        path: "/auth",
        controller: auth_controller_1.AuthController
    }];
exports.default = routes;
