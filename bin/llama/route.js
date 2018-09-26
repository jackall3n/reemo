"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_1 = require("./decorator");
exports.Route = decorator_1.makeDecorator('Route', (r = {}) => r);
