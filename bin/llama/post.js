"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorator_1 = require("./decorator");
exports.Post = decorator_1.makePropDecorator('Post', (p) => (Object.assign({ method: "POST" }, p)));
