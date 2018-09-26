"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app_module_1 = require("./app.module");
const route_service_1 = require("./services/route.service");
class ApiServer {
    constructor() {
        this.mainModule = new app_module_1.default();
        this.app = express();
        this.config();
        this.initialize();
    }
    static bootstrap() {
        return new ApiServer();
    }
    config() {
        this.app.all('*', function (request, response, next) {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use((error, request, response, next) => {
            error.status = 404;
            next(error);
        });
    }
    initialize() {
        let baseRouter = route_service_1.default.init(app_module_1.default);
        this.app.use("/", baseRouter);
    }
}
exports.default = ApiServer;
