import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import Match from "../db/schemas/match";
import {Post} from "../llama/post";
import Team from "../db/schemas/team";
import * as moment from "moment";

@Controller()
export class MatchesController {

    @Get({path: "/"})
    getAll(request: e.Request, response: e.Response): void {
        Match.find({}).populate('home_team away_team').exec().then( (matches) => {
            response.send(matches);
        }).catch(error => {
            response.send(error);
        })
    }

    @Post({path: "/add"})
    add(request: e.Request, response: e.Response): void {

        let {
            home,
            away,
            date,
            time
        } = request.body;

        Promise.all([
            Team.findOne({name: home}),
            Team.findOne({name: away})
        ]).then((teams: any[]) => {
            let match = new Match();

            let home_team = teams[0];
            let away_team = teams[1];

            match.home_team = home_team._id;
            match.away_team = away_team._id;

            match.date = moment(`${date}/2018 ${time}:00`, 'DD/MM/YYYY HH:mm').toDate();

            match.save().then(match => {
                response.send({match, teams});
            })
        });
    }
}