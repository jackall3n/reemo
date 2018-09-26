import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import Group from "../db/schemas/group";

@Controller()
export class GroupsController {

    @Get({path: "/"})
    getAll(request: e.Request, response: e.Response): void {
        Group.find({}, 'letter', {
            sort: {
                letter: 1
            }
        }).populate('teams').exec().then(groups => {
            response.send(groups);
        }).catch(error => {
            response.send(error);
        });
    }
}