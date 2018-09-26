"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const llama_1 = require("../llama");
let ApiService = class ApiService {
    get(requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("GET", requestOptions);
        });
    }
    post(requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request("POST", requestOptions);
        });
    }
    request(method, requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = Object.assign({ method: method }, requestOptions.configuration);
            if (requestOptions.authorise) {
                config.headers = Object.assign({}, config.headers, { 'X-Client-ID': 'ca64d8b13659be4a3318', 'X-Access-Token': '51642767be1a232258f4e06959987c73b8bf2ac537a9fbf40dd7452533b0' });
            }
            try {
                const response = yield axios_1.default.request(config);
                return requestOptions.dataPath ? this.dive(requestOptions.dataPath, response.data) : response.data;
            }
            catch (error) {
                console.error("An API call failed with");
                console.error(error);
                return error;
            }
        });
    }
    dive(path, data) {
        if (typeof path === "string") {
            path = path.split('.');
        }
        let segment = path.splice(0, 1);
        let dataSegment = data[segment];
        if (path.length) {
            return this.dive(path, dataSegment);
        }
        return dataSegment;
    }
};
ApiService = __decorate([
    llama_1.Service()
], ApiService);
exports.default = ApiService;
