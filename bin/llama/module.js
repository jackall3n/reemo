"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_1 = require("./decorator");
exports.Module = decorator_1.makeDecorator('Module', (m) => (Object.assign({}, m)));
