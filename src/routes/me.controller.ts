import * as e from "express"
import {Controller} from "../llama";
import {Post} from "../llama/post";
import User from "../db/schemas/user";
import * as jwt from 'jsonwebtoken';
import configuration from '../config';
import {Get} from "../llama/get";

@Controller()
export class MeController {

    @Get({path: '/', authorise: true})
    me(request: e.Request, response: e.Response): void {
        User.findById(request.user.id).populate('donation donations teams').exec().then(user => {
            response.send({
                id: user._id,
                name: user.name,
                donation: user.donation,
                donations: user.donations,
                teams: user.teams
            })
        }).catch(error => {
            response.status(401).send();
        })
    }
}