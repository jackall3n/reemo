"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injector_service_1 = require("../services/injector.service");
exports.Mapper = () => {
    return (target) => {
        injector_service_1.Injector.set(target);
    };
};
