"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_1 = require("./decorator");
exports.Server = decorator_1.makeDecorator('Server', (s) => (Object.assign({}, s)));
