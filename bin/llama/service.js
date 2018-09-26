"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_1 = require("./decorator");
exports.Service = decorator_1.makeDecorator('Service', (s = {}) => s);
