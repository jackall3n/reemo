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
const api_service_1 = require("./api.service");
const subreddit_mapper_1 = require("../mappers/subreddit.mapper");
const llama_1 = require("../llama");
const config_service_1 = require("./config.service");
let RedditService = class RedditService {
    constructor(_api, _configService) {
        this._api = _api;
        this._configService = _configService;
        this.reddit_endpoints = new config_service_1.RedditEndpoints();
        this.reddit_client = this._configService.getRedditClient();
    }
    getSubreddit(subreddit_name, access_token, time_period = "month", limit = 25) {
        let options = {
            mapper: subreddit_mapper_1.SubredditMapper,
            dataPath: 'data.children',
            configuration: {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                },
                baseURL: this.reddit_endpoints.oauth_base_url,
                url: `r/${subreddit_name}/top/.json`,
                params: {
                    "limit": limit,
                    "t": time_period,
                    "sort": "top"
                }
            }
        };
        return this._api.get(options);
    }
    getSubredditInformation(subreddit_name) {
        let options = {
            mapper: subreddit_mapper_1.SubredditInformationMapper,
            dataPath: 'data',
            configuration: {
                baseURL: this.reddit_endpoints.base_url,
                url: `r/${subreddit_name}/about/.json`
            }
        };
        return this._api.get(options);
    }
    getAccessToken(username, password) {
        let base_64_token = Buffer.from(`${this.reddit_client.id}:${this.reddit_client.secret}`, 'ascii').toString("base64");
        let options = {
            dataPath: "access_token",
            configuration: {
                baseURL: this.reddit_endpoints.base_url,
                url: this.reddit_endpoints.access_token,
                headers: {
                    "Authorization": `Basic ${base_64_token}`
                },
                params: {
                    grant_type: "password",
                    username: username,
                    password: password
                }
            }
        };
        return this._api.post(options);
    }
};
RedditService = __decorate([
    llama_1.Service(),
    __metadata("design:paramtypes", [api_service_1.default, config_service_1.default])
], RedditService);
exports.default = RedditService;
