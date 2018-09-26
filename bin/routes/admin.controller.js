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
const user_1 = require("../db/schemas/user");
const _ = require("lodash");
const api_service_1 = require("../services/api.service");
const donation_1 = require("../db/schemas/donation");
const team_1 = require("../db/schemas/team");
let AdminController = class AdminController {
    constructor() {
        this.apiService = new api_service_1.default();
        this.options = {
            configuration: {
                baseURL: 'http://api.justgiving.com/v1',
                url: 'fundraising/pages/fifa-worldcup/donations'
            }
        };
    }
    donationErrors(request, response) {
        user_1.default.find({}).populate('donations donation').then(users => {
            response.send(_(users).filter(u => {
                return !u.donations || u.donations.length === 0 || !_(u.donations).some(d => d.status === 'SUBMITTED');
            }));
        });
    }
    teams(request, response) {
        user_1.default.find({ teams: { $exists: true } }).populate('teams').then(users => {
            response.send(_(users).filter(u => u.teams.length > 0));
        });
    }
    clear(request, response) {
    }
    process_teams(request, response) {
        Promise.all([
            user_1.default.find({}).populate('donations'),
            team_1.default.find({})
        ]).then(results => {
            let users = _(results[0]).filter((u) => {
                return _(u.donations).some({ verified: true });
            }).value();
            let teams = _(results[1]).map(t => {
                return {
                    name: t.name,
                    id: t._id
                };
            }).value();
            let count = 1;
            let used = [];
            console.log(teams.length, "teams", users.length, "users");
            for (var c = 0; c < 3; c++) {
                console.log("assign");
                _(teams).forEach((t, i) => {
                    let random_team = used.length === teams.length;
                    console.log(random_team);
                    let team = random_team ? this.get_random_team(teams) : t;
                    let filtered = _(users).filter((u) => {
                        return u.teams.length < 3 && !u.teams.includes(team.id);
                    }).value();
                    if (!filtered || filtered.length === 0) {
                        return;
                    }
                    if (used.indexOf(team.id) === -1) {
                        used.push(team.id);
                    }
                    this.get_random_user(filtered).teams.push(team.id);
                });
            }
            do {
                count++;
            } while (count <= 3);
            let saves = users.map((u) => u.save());
            Promise.all(saves).then((_users) => {
                response.send(_users);
            });
        });
    }
    get_random_team(teams) {
        let index = _.random(0, teams.length - 1);
        return teams[index];
    }
    get_random_user(users) {
        let index = _.random(0, users.length - 1);
        return users[index];
    }
    donated(request, response) {
        donation_1.default.find({ verified: true }).populate({ path: 'user', select: 'name' }).then(donations => {
            response.send(_(donations).flatMap(d => d.user));
        });
    }
    remote(request, response) {
        this.apiService.get(this.options).then((remotes) => {
            response.send(_(remotes.donations).map(r => ({ id: r.id, _id: r.thirdPartyReference })));
        });
    }
    verify(request, response) {
        Promise.all([
            donation_1.default.find({}),
            this.apiService.get(this.options)
        ]).then((results) => {
            let locals = results[0];
            let remotes = results[1].donations;
            let saves = [];
            _(locals).forEach(l => {
                if (_(remotes).some({ id: l.donation_id }) && !l.verified) {
                    l.verified = true;
                    saves.push(l.save());
                }
            });
            Promise.all(saves).then(saved => {
                response.send(saved);
            });
        });
    }
    unknown(request, response) {
        Promise.all([
            donation_1.default.find({}),
            this.apiService.get(this.options)
        ]).then((results) => {
            let locals = results[0];
            let remotes = results[1].donations;
            let unknown = [];
            _(remotes).forEach(r => {
                if (!_(locals).some({ donation_id: r.id })) {
                    unknown.push(r);
                }
            });
            response.send(unknown);
        });
    }
    failed(request, response) {
        Promise.all([
            donation_1.default.find({}),
            this.apiService.get(this.options)
        ]).then((results) => {
            let locals = results[0];
            let remotes = results[1].donations;
            let failures = [];
            _(locals).forEach(l => {
                if (!_(remotes).some({ id: l.donation_id }) && l.donation_id) {
                    failures.push(l);
                }
            });
            response.send(failures);
        });
    }
    tie_donations(request, response) {
        Promise.all([
            user_1.default.find({}),
            donation_1.default.find({}),
            this.apiService.get(this.options)
        ]).then((results) => {
            let users = results[0];
            let locals = results[1];
            let remotes = results[2].donations;
            let submitted = [];
            let donations = _(remotes).map(remote => {
                let local = _(locals).find(l => {
                    return l.donation_id === remote.id || l._id === remote.thirdPartyReference;
                });
                let confirmed = (local
                    && local.donation_id === remote.id
                    && local.status === "SUBMITTED") || false;
                return {
                    confirmed,
                    local,
                    remote
                };
            });
            response.send({ users,
                donations: donations.filter(d => !d.confirmed) });
        }).catch(error => {
            response.send(error);
        });
    }
};
__decorate([
    get_1.Get({ path: '/donation_errors' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "donationErrors", null);
__decorate([
    get_1.Get({ path: '/teams' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "teams", null);
__decorate([
    get_1.Get({ path: '/clear' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "clear", null);
__decorate([
    get_1.Get({ path: '/process_teams' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "process_teams", null);
__decorate([
    get_1.Get({ path: '/donaters' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "donated", null);
__decorate([
    get_1.Get({ path: '/remote' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remote", null);
__decorate([
    get_1.Get({ path: '/verify' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "verify", null);
__decorate([
    get_1.Get({ path: '/unknown' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "unknown", null);
__decorate([
    get_1.Get({ path: '/failed' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "failed", null);
__decorate([
    get_1.Get({ path: '/tie_donations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "tie_donations", null);
AdminController = __decorate([
    llama_1.Controller()
], AdminController);
exports.AdminController = AdminController;
