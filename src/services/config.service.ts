import {Service} from "../llama";


export class RedditEndpoints {
    base_url = "https://www.reddit.com";
    oauth_base_url = "https://oauth.reddit.com";

    access_token = "/api/v1/access_token";
    me = "/api/v1/me";
}

export interface RedditClient {
    id: string;
    secret: string;
}

@Service()
export default class ConfigService {
    getRedditClient(): RedditClient {
        return {
            id: process.env.REDDIT_CLIENT_ID,
            secret: process.env.REDDIT_CLIENT_SECRET
        };
    }
}