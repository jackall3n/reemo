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
const post_1 = require("../llama/post");
const donation_1 = require("../db/schemas/donation");
const user_1 = require("../db/schemas/user");
let DonationsController = class DonationsController {
    placeholder(request, response) {
        let { amount } = request.body;
        user_1.default.findById(request.user.id).populate('donations').exec().then(user => {
            var donation = new donation_1.default({
                status: "CREATED",
                user: user.id,
                amount
            });
            donation.save().then(_donation => {
                user.donations.push(_donation._id);
                user.save().then(_user => {
                    response.send({
                        donation: {
                            id: _donation._id
                        },
                        success: true
                    });
                }).catch(error => {
                    response.status(400).send({
                        success: false
                    });
                });
            }).catch(error => {
                response.status(400).send({
                    success: false
                });
            });
        }).catch(error => {
            response.status(400).send({
                success: false
            });
        });
    }
    save(request, response) {
        let { donation_id, reference } = request.body;
        donation_1.default.findById(reference).exec().then(donation => {
            donation.donation_id = donation_id;
            donation.status = "SUBMITTED";
            donation.submitted = new Date();
            donation.save().then(_donation => {
                response.send({
                    _donation,
                    success: true
                });
            });
        }).catch(error => {
            response.status(400).send({
                success: false
            });
        });
        if (!donation_id) {
            response.status(400).send({
                success: false
            });
            return;
        }
    }
};
__decorate([
    post_1.Post({ path: "/placeholder", authorise: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DonationsController.prototype, "placeholder", null);
__decorate([
    post_1.Post({ path: "/save", authorise: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DonationsController.prototype, "save", null);
DonationsController = __decorate([
    llama_1.Controller()
], DonationsController);
exports.DonationsController = DonationsController;
