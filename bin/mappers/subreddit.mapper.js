"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapper_1 = require("../llama/mapper");
let SubredditMapper = class SubredditMapper {
    _getPostType(kind) {
        switch (kind) {
            case "t1":
                return "comment";
            case "t2":
                return "account";
            case "t3":
                return "link";
            case "t4":
                return "message";
            case "t5":
                return "subreddit";
            case "t6":
                return "award";
        }
    }
    map(posts) {
        return posts.filter(post => this._getPostType(post.kind) === "link").map(post => {
            let subreddit_data = post.data;
            return {
                id: subreddit_data.id,
                permalink: subreddit_data.permalink,
                url: subreddit_data.url,
                subreddit: subreddit_data.subreddit,
                title: subreddit_data.title,
                image_url: subreddit_data.preview.images[0].source.url,
                image_id: subreddit_data.preview.images[0].id,
                created: subreddit_data.created,
                author: subreddit_data.author,
                score: subreddit_data.score,
                comments: subreddit_data.num_comments,
                domain: subreddit_data.domain,
                thumbnail_url: subreddit_data.thumbnail,
                type: subreddit_data.post_hint === "image" ? "image" : this._getPostType(post.kind)
            };
        });
    }
};
SubredditMapper = __decorate([
    mapper_1.Mapper()
], SubredditMapper);
exports.SubredditMapper = SubredditMapper;
let SubredditInformationMapper = class SubredditInformationMapper {
    map(data) {
        return {
            id: data.id,
            icon_image_url: data.icon_img,
            description: data.public_description,
            display_name: data.display_name,
            display_name_prefixed: data.display_name_prefixed
        };
    }
};
SubredditInformationMapper = __decorate([
    mapper_1.Mapper()
], SubredditInformationMapper);
exports.SubredditInformationMapper = SubredditInformationMapper;
