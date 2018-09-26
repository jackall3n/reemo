"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("express");
const llama_1 = require("../llama");
const get_1 = require("../llama/get");
const group_1 = require("../db/schemas/group");
let GroupsController = class GroupsController {
    getAll(request, response) {
        group_1.default.find({}, 'letter', {
            sort: {
                letter: 1
            }
        }).populate('teams').exec().then(groups => {
            response.send(groups);
        }).catch(error => {
            response.send(error);
        });
    }
};
__decorate([
    get_1.Get({ path: "/" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getAll", null);
GroupsController = __decorate([
    llama_1.Controller()
], GroupsController);
exports.GroupsController = GroupsController;
