"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_service_1 = require("./api.service");
class WunderlistService {
    constructor() {
        this.api_service = new api_service_1.default();
        this.auth = {
            access_token: (code) => __awaiter(this, void 0, void 0, function* () {
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
                try {
                    return yield this.api_service.post(request_config);
                }
                catch (error) {
                    throw error;
                }
            })
        };
        this.tasks = {
            get: (list_id) => __awaiter(this, void 0, void 0, function* () {
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
            }),
            getOne: (id) => __awaiter(this, void 0, void 0, function* () {
                let request_config = {
                    configuration: {
                        baseURL: 'http://a.wunderlist.com/api/v1',
                        url: 'tasks/:id',
                        params: {
                            id
                        }
                    },
                    authorise: true
                };
                return this.api_service.get(request_config);
            })
        };
        this.lists = {
            get: () => __awaiter(this, void 0, void 0, function* () {
                let request_config = {
                    configuration: {
                        baseURL: 'http://a.wunderlist.com/api/v1',
                        url: 'lists'
                    },
                    authorise: true
                };
                return yield this.api_service.get(request_config);
            }),
            getOne: (id) => __awaiter(this, void 0, void 0, function* () {
                let request_config = {
                    configuration: {
                        baseURL: 'http://a.wunderlist.com/api/v1',
                        url: `lists/${id}`
                    },
                    authorise: true
                };
                return yield this.api_service.get(request_config);
            })
        };
    }
}
exports.WunderlistService = WunderlistService;
