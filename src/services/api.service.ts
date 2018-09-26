import axios, {AxiosPromise} from "axios"
import {Mapper} from "../llama/mapper";
import {Injector} from "./injector.service";
import {Service, Type} from "../llama";

export interface RequestOptions<T> {
    dataPath?: string;
    mapper?: Type<Mapper<T>>,
    configuration: RequestConfiguration
}

export interface RequestConfiguration {
    method?: string;
    baseURL?: string;
    url: string;
    headers?: { [key: string]: string }
    params?: { [key: string]: string | number }
}

@Service()
export default class ApiService {

    get<T>(requestOptions: RequestOptions<T>): AxiosPromise<T> {
        return this.request("GET", requestOptions)
    }

    post<T>(requestOptions: RequestOptions<T>): AxiosPromise<T> {
        return this.request("POST", requestOptions)
    }

    private request<T>(method: string, requestOptions: RequestOptions<T>): AxiosPromise<T> {
        let config = {
            method: method,
            ...requestOptions.configuration
        };

        config.headers = {"x-api-key": "627f766b", ...config.headers};

        let map = requestOptions.mapper ? Injector.resolve<Mapper<T>>(requestOptions.mapper) : null;

        return axios.request(config).then(response => {
            let data = requestOptions.dataPath ? this.dive(requestOptions.dataPath, response.data) : response.data;

            return map ? map.map(data) : data;
        }).catch(error => {
            console.error("An API call failed with");
            console.error(error);

            return error;
        })
    }

    private dive(path: string | string[], data: any): any {
        if (typeof path === "string") {
            path = path.split('.');
        }

        let segment = path.splice(0, 1);
        let dataSegment = data[segment as any];

        if (path.length) {
            return this.dive(path, dataSegment);
        }

        return dataSegment;
    }
}