import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import User, { IUser } from "../db/schemas/user";
import * as jwt from 'jsonwebtoken';
import configuration from '../config';
import * as _ from 'lodash';
import ApiService from "../services/api.service";
import Donation from "../db/schemas/donation";
import Team from '../db/schemas/team';

@Controller()
export class RootController {

    @Get({path: '/'})
    donationErrors(request: e.Request, response: e.Response): void {
        response.send({ test: 'hi' })
    }
}