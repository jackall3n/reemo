import ApiService from "./api.service";
import {List, Task}  from '../types/wunderlist';

export class WunderlistService {
    api_service = new ApiService();

    auth = {
        access_token: async (code : string) : Promise<{ access_token: string }> => {
            let request_config = {
                configuration:{
                    baseURL: 'https://www.wunderlist.com',
                    url:'oauth/access_token',
                    data: {
                        code,
                        client_id: 'ca64d8b13659be4a3318',
                        client_secret : '873793c1dc8e1cc9b9663a3fa23be51da8059a0f5412469de8ee51aadc40'
                    }
                }
            };

            return await this.api_service.post<{ access_token: string }>(request_config)
        }
    };

    tasks = {
        get: async (list_id: number) : Promise<List[]> => {
            let request_config = {
                configuration:{
                    baseURL:'http://a.wunderlist.com/api/v1',
                    url :'tasks',
                    params: {
                        list_id
                    }
                },
                authorise: true
            };

            return this.api_service.get<Task[]>(request_config)
        },
        getOne: async (id: number) : Promise<List[]> => {
            let request_config = {
                configuration:{
                    baseURL:'http://a.wunderlist.com/api/v1',
                    url :'tasks/:id',
                    params: {
                        id
                    }
                },
                authorise: true
            };

            return this.api_service.get<Task[]>(request_config)
        }
    };

    lists = {
        get: async () : Promise<List[]> => {
            let request_config = {
                configuration:{
                    baseURL:'http://a.wunderlist.com/api/v1',
                    url : 'lists/:id'
                },
                authorise: true
            };

            return await this.api_service.get<List[]>(request_config)
        },
        getOne: async (id: number) : Promise<List[]> => {
            let request_config = {
                configuration:{
                    baseURL:'http://a.wunderlist.com/api/v1',
                    url : 'lists/:id',
                    params: {
                        id
                    }
                },
                authorise: true
            };

            return await this.api_service.get<List[]>(request_config)
        }
    };
}