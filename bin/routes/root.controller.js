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
const wunderlist_service_1 = require("../services/wunderlist.service");
let RootController = class RootController {
    constructor() {
        this.wunderlist_service = new wunderlist_service_1.WunderlistService();
    }
    hi(request, response) {
        let client_id = 'ca64d8b13659be4a3318';
        let redirect_uri = encodeURIComponent("http://localhost:5678/auth/token");
        let state = "dead";
        response.send(`<a href="https://www.wunderlist.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}">Go</a>`);
    }
    lists(request, response) {
        this.wunderlist_service.lists().then(lists => {
            response.send(`<script>console.log(${JSON.stringify(lists)})</script>`);
        }).catch(_ => response.send('error'));
    }
    tasks(request, response) {
        this.wunderlist_service.lists().then((lists) => {
            console.log('Found lists:', lists.length);
            let task_promises = lists.map((list) => {
                return new Promise((res, rej) => {
                    this.wunderlist_service.tasks(list.id).then((tasks) => {
                        res({ list, tasks });
                    });
                });
            });
            Promise.all(task_promises).then(res => response.send(`<script>console.log(${JSON.stringify(res)})</script>`));
        }).catch(_ => response.send('error'));
    }
};
__decorate([
    get_1.Get({ path: '/' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "hi", null);
__decorate([
    get_1.Get({ path: '/lists' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "lists", null);
__decorate([
    get_1.Get({ path: '/tasks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "tasks", null);
RootController = __decorate([
    llama_1.Controller()
], RootController);
exports.RootController = RootController;
