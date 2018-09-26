import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import User from "../db/schemas/user";
import * as jwt from 'jsonwebtoken';
import configuration from '../config';
import { WunderlistService } from "../services/wunderlist.service";

@Controller()
export class AuthController {
    wunderlist_service = new WunderlistService()


    @Get({path: '/token'})
    token(request: e.Request, response: e.Response): void {
       console.log(request.query)


       this.wunderlist_service.access_token(request.query.code).then(({access_token}) => 
        {
            response.send({access_token})
        })


    }
}