"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const llama_1 = require("../llama");
class RedditEndpoints {
    constructor() {
        this.base_url = "https://www.reddit.com";
        this.oauth_base_url = "https://oauth.reddit.com";
        this.access_token = "/api/v1/access_token";
        this.me = "/api/v1/me";
    }
}
exports.RedditEndpoints = RedditEndpoints;
let ConfigService = class ConfigService {
    getRedditClient() {
        return {
            id: process.env.REDDIT_CLIENT_ID,
            secret: process.env.REDDIT_CLIENT_SECRET
        };
    }
};
ConfigService = __decorate([
    llama_1.Service()
], ConfigService);
exports.default = ConfigService;
