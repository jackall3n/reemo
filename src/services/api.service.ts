import axios, {AxiosPromise} from "axios"
import {Mapper} from "../llama/mapper";
import {Injector} from "./injector.service";
import {Service, Type} from "../llama";

export interface RequestOptions<T> {
    authorise?: boolean,
    dataPath?: string;
    mapper?: Type<Mapper<T>>,
    configuration: RequestConfiguration
}

export interface RequestConfiguration {
    method?: string;
    baseURL?: string;
    url: string;
    headers?: { [key: string]: string }
    params?: { [key: string]: string | number },
    body?: { [key: string]: string }
}

@Service()
export default class ApiService {

    async get<T>(requestOptions: RequestOptions<T>): Promise<T> {
        return await this.request<T>("GET", requestOptions);
    }

    async post<T>(requestOptions: RequestOptions<T>): Promise<T> {
        return await this.request("POST", requestOptions)
    }

    private async request<T>(method: string, requestOptions: RequestOptions<T>): Promise<T> {
        let config = {
            method: method,
            ...requestOptions.configuration
        };

        if(requestOptions.authorise) 
        {
            config.headers = {
                ...config.headers,
                'X-Client-ID' : 'ca64d8b13659be4a3318',
                'X-Access-Token' : '51642767be1a232258f4e06959987c73b8bf2ac537a9fbf40dd7452533b0'
            }
        }

         // let map = requestOptions.mapper ? Injector.resolve<Mapper<T>>(requestOptions.mapper) : null;

        try {
            const response = await axios.request(config);

            return requestOptions.dataPath ? this.dive(requestOptions.dataPath, response.data) : response.data;
        }
        catch(error) {
            console.error("An API call failed with");
            console.error(error);

            return error;
        }
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