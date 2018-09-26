"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_1 = require("./decorator");
exports.Get = decorator_1.makePropDecorator('Get', (g) => (Object.assign({ method: "GET" }, g)));
