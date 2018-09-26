"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const injector_service_1 = require("./injector.service");
const llama_1 = require("../llama");
let ApiService = class ApiService {
    get(requestOptions) {
        return this.request("GET", requestOptions);
    }
    post(requestOptions) {
        return this.request("POST", requestOptions);
    }
    request(method, requestOptions) {
        let config = Object.assign({ method: method }, requestOptions.configuration);
        config.headers = Object.assign({ "x-api-key": "627f766b" }, config.headers);
        let map = requestOptions.mapper ? injector_service_1.Injector.resolve(requestOptions.mapper) : null;
        return axios_1.default.request(config).then(response => {
            let data = requestOptions.dataPath ? this.dive(requestOptions.dataPath, response.data) : response.data;
            return map ? map.map(data) : data;
        }).catch(error => {
            console.error("An API call failed with");
            console.error(error);
            return error;
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
