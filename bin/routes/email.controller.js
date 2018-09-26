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
const email_service_1 = require("../services/email.service");
const team_email_1 = require("../templates/team.email");
const user_1 = require("../db/schemas/user");
const _ = require("lodash");
let EmailController = class EmailController {
    constructor() {
        this.emailService = new email_service_1.EmailService();
    }
    teams(request, response) {
        user_1.default.find({ teams: { $exists: true } }).populate('teams').exec().then(users => {
            let emails = _(users).map(user => {
                let to = user.email;
                let subject = 'Your teams have been selected!';
                let html = team_email_1.TeamTemplate.parse({
                    user: user,
                    teams: user.teams
                });
                return this.emailService.send(to, subject, html);
            }).value();
            Promise.all(emails).then(results => {
                response.send(results);
            });
        }).catch(error => {
            response.send(error);
        });
    }
    remind(request, response) {
        response.send({});
    }
};
__decorate([
    get_1.Get({ path: '/teams' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "teams", null);
__decorate([
    get_1.Get({ path: '/remind' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "remind", null);
EmailController = __decorate([
    llama_1.Controller()
], EmailController);
exports.EmailController = EmailController;
