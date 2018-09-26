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
const team_1 = require("../db/schemas/team");
const post_1 = require("../llama/post");
const group_1 = require("../db/schemas/group");
let TeamController = class TeamController {
    getAll(request, response) {
        team_1.default.find({}, (error, teams) => {
            if (error) {
                response.send(error);
                return;
            }
            response.send(teams);
        });
    }
    add(request, response) {
        let { name, group_id } = request.body;
        group_1.default.findById(group_id, (error, group) => {
            if (error) {
                response.send(error);
                return;
            }
            let team = new team_1.default();
            team.name = name;
            team.group = group._id;
            team.save().then(team_result => {
                group.teams.push(team_result._id);
                group.save().then(group_result => {
                    response.send({
                        team: team_result,
                        group: group_result
                    });
                });
            });
        });
    }
};
__decorate([
    get_1.Get({ path: "/" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "getAll", null);
__decorate([
    post_1.Post({ path: "/add" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "add", null);
TeamController = __decorate([
    llama_1.Controller()
], TeamController);
exports.TeamController = TeamController;
