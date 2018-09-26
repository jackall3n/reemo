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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("express");
const llama_1 = require("../llama");
const get_1 = require("../llama/get");
const wunderlist_service_1 = require("../services/wunderlist.service");
let TasksController = class TasksController {
    constructor() {
        this.wunderlist_service = new wunderlist_service_1.WunderlistService();
    }
    tasks(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lists = yield this.wunderlist_service.lists.get();
                console.log(`Found ${lists.length} lists.`);
                const task_requests = lists.map(list => new Promise((result) => __awaiter(this, void 0, void 0, function* () {
                    const tasks = yield this.wunderlist_service.tasks.get(list.id);
                    console.log(`Found ${tasks.length} tasks for ${list.id}.`);
                    result({
                        list,
                        tasks
                    });
                })));
                try {
                    const tasks = yield Promise.all(task_requests);
                    response.send(`<script>console.log(${JSON.stringify(tasks)})</script>`);
                }
                catch (error) {
                    console.log(error);
                }
            }
            catch (error) {
                response.send('error');
            }
        });
    }
    task(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const tasks = yield this.wunderlist_service.tasks.getOne(id);
                response.send(`<script>console.log(${JSON.stringify(tasks)})</script>`);
            }
            catch (error) {
                response.send('error');
            }
        });
    }
};
__decorate([
    get_1.Get({ path: '/' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "tasks", null);
__decorate([
    get_1.Get({ path: '/:id' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "task", null);
TasksController = __decorate([
    llama_1.Controller()
], TasksController);
exports.TasksController = TasksController;
