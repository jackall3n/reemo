import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import { EmailService } from "../services/email.service";
import { TeamTemplate } from "../templates/team.email";
import User from "../db/schemas/user";
import * as _ from 'lodash';

@Controller()
export class EmailController {
    emailService = new EmailService();

    @Get({path: '/teams'})
    teams(request: e.Request, response: e.Response): void {
        
        User.find({teams: {$exists: true}}).populate('teams').exec().then(users => {

            let emails : any[] = _(users).map(user => {
                let to = user.email;
                let subject = 'Your teams have been selected!'
                let html = TeamTemplate.parse({
                    user: user,
                    teams: user.teams
                })

                return this.emailService.send(to, subject, html);
            }).value();

            Promise.all(emails).then(results => {
                response.send(results);
            })

        }).catch(error => {
            response.send(error)
        })
    }

    @Get({path: '/remind'})
    remind(request: e.Request, response: e.Response): void {

        /*User.find({
        })

        let to = 'jackallensemail@gmail.com';
        let subject = 'Quick, you still have time to donate!';
        let html = RemindTemplate.parse({
            firstName: 'Jack'
        });

        this.emailService.send(to, subject, html).then(success => {
            response.send(success);
        }).catch(error => {
            response.send(error);
        })*/
        response.send({})
    }

}