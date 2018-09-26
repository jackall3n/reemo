"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_1 = require("./decorator");
function initialize(co) {
    console.log(co);
}
exports.Controller = decorator_1.makeDecorator('Controller', (co = {}) => (Object.assign({ initialize }, co)));
