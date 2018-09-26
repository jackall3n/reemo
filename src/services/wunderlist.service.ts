import ApiService from "./api.service";
import {List, Task}  from '../types/wunderlist';

export class WunderlistService {
    api_service = new ApiService();

    access_token(code : string) : Promise<{ access_token: string }> {
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

        return this.api_service.post<{ access_token: string }>(request_config)
    }

    async lists() : Promise<List[]> {
        let request_config = {
            configuration:{
                baseURL:'http://a.wunderlist.com/api/v1',
                url :'lists'
            },
            authorise: true
        };

        return await this.api_service.get<List[]>(request_config)
    }

    tasks(list_id: number) : Promise<Task[]> {
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
    }
}