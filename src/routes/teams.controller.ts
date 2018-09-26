import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import Team from "../db/schemas/team";
import {Post} from "../llama/post";
import Group from "../db/schemas/group";

@Controller()
export class TeamController {

    @Get({path: "/"})
    getAll(request: e.Request, response: e.Response): void {
        Team.find({}, (error, teams) => {
            if (error) {
                response.send(error);
                return;
            }

            response.send(teams);
        })
    }

    @Post({path: "/add"})
    add(request: e.Request, response: e.Response): void {
        let {name, group_id} = request.body;

        Group.findById(group_id, (error, group) => {
            if (error) {
                response.send(error);
                return;
            }

            let team = new Team();

            team.name = name;
            team.group = group._id;

            team.save().then(team_result => {
                group.teams.push(team_result._id);
                group.save().then(group_result => {
                    response.send({
                        team: team_result,
                        group: group_result
                    })
                })
            })

        });
    }
}