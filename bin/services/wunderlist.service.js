"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_service_1 = require("./api.service");
class WunderlistService {
    constructor() {
        this.api_service = new api_service_1.default();
    }
    access_token(code) {
        let request_config = {
            configuration: {
                baseURL: 'https://www.wunderlist.com',
                url: 'oauth/access_token',
                data: {
                    code,
                    client_id: 'ca64d8b13659be4a3318',
                    client_secret: '873793c1dc8e1cc9b9663a3fa23be51da8059a0f5412469de8ee51aadc40'
                }
            }
        };
        return this.api_service.post(request_config);
    }
    lists() {
        let request_config = {
            configuration: {
                baseURL: 'http://a.wunderlist.com/api/v1',
                url: 'lists'
            },
            authorise: true
        };
        return this.api_service.get(request_config);
    }
    tasks(list_id) {
        let request_config = {
            configuration: {
                baseURL: 'http://a.wunderlist.com/api/v1',
                url: 'tasks',
                params: {
                    list_id
                }
            },
            authorise: true
        };
        return this.api_service.get(request_config);
    }
}
exports.WunderlistService = WunderlistService;
