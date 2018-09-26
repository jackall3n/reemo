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
export class AdminController {
    apiService = new ApiService();

    options = {
        configuration: {
            baseURL: 'http://api.justgiving.com/v1',
            url: 'fundraising/pages/fifa-worldcup/donations'
        }
    }

    @Get({path: '/donation_errors'})
    donationErrors(request: e.Request, response: e.Response): void {
        User.find({}).populate('donations donation').then(users => {
            response.send(_(users).filter(u => {
                return !u.donations || u.donations.length === 0 || !_(u.donations).some(d => d.status === 'SUBMITTED')
            }))
        })
    }

    @Get({path: '/teams'})
    teams(request: e.Request, response: e.Response): void {
        User.find({ teams: { $exists: true }}).populate('teams').then(users => {
            response.send(_(users).filter(u => u.teams.length > 0));
        });
    }

    @Get({path: '/clear'})
    clear(request: e.Request, response: e.Response): void {
        /*User.find({ teams: {$exists: true }}).populate('teams').then(users => {
            response.send(users);
        });*/

        /*User.update({}, { $set: { teams: [] }, }, {multi: true}).then(affected => {
            response.send(affected);
        }).catch(error => {
            response.send(error);
        });*/
    }

    @Get({path: '/process_teams'})
    process_teams(request: e.Request, response: e.Response): void {
        Promise.all([
            User.find({}).populate('donations'),
            Team.find({})
        ]).then(results => {
            let users : any[] = _(results[0]).filter((u: any) => {
                return _(u.donations).some({verified: true})
            }).value();

            let teams : any[] = _(results[1]).map(t => {
                return {
                    name: t.name,
                    id: t._id
                }
            }).value();

            let count = 1;
            let used: any[] = []

            console.log(teams.length, "teams", users.length, "users")
            
            for (var c = 0; c < 3; c++) {
                console.log("assign");

                _(teams).forEach((t: any, i:number) => {
                    let random_team = used.length === teams.length;

                    console.log(random_team);

                    let team = random_team ? this.get_random_team(teams) : t;
        
                    let filtered : any[] = _(users).filter((u: any) => {
                        return u.teams.length < 3 && !u.teams.includes(team.id)
                    }).value();
        
                    if(!filtered || filtered.length === 0) {
                        return
                    }

                    if(used.indexOf(team.id) === -1) {
                        used.push(team.id);
                    }
        
                    this.get_random_user(filtered).teams.push(team.id);
                })
            }
            do {
                //random = true;
                count ++;
            }
            while (count <= 3) 

            let saves = users.map((u:any) => u.save());
            Promise.all(saves).then((_users :any) => {
                response.send(
                    _users
                );
            })
            
        })
    }

    get_random_team(teams: any[]) {
        let index = _.random(0, teams.length - 1);

        return teams[index];
    }

    get_random_user(users: any[]) {
        let index = _.random(0, users.length - 1);

        return users[index];
    }

    @Get({path: '/donaters'})
    donated(request: e.Request, response: e.Response): void {
        Donation.find({ verified: true }).populate({path:'user', select: 'name'}).then(donations => {
            response.send(_(donations).flatMap(d => d.user))
        })
    }

    @Get({path: '/remote'})
    remote(request: e.Request, response: e.Response): void {
        this.apiService.get<any>(this.options).then((remotes:any) => {
            response.send(_(remotes.donations).map(r => ({id: r.id, _id: r.thirdPartyReference})))
        })
    }

    @Get({path: '/verify'})
    verify(request: e.Request, response: e.Response): void { 
        Promise.all([
            Donation.find({}),
            this.apiService.get<any>(this.options)
        ]).then((results : any[]) => {
            let locals = results[0];
            let remotes = results[1].donations;

            let saves : any[] = [];

            _(locals).forEach(l => {
                if(_(remotes).some({id: l.donation_id}) && !l.verified) {
                    l.verified = true
                    saves.push(l.save())
                }
            })

            Promise.all(saves).then(saved => {
                response.send(saved)
            })
        });
    }

    @Get({path: '/unknown'})
    unknown(request: e.Request, response: e.Response): void {
        Promise.all([
            Donation.find({}),
            this.apiService.get<any>(this.options)
        ]).then((results : any[]) => {
            let locals = results[0];
            let remotes = results[1].donations;

            let unknown : any[] = [];

            _(remotes).forEach(r => {
                if(!_(locals).some({donation_id: r.id})) {
                    unknown.push(r)
                }
            })

            response.send(unknown)
        });

    }

    @Get({path: '/failed'})
    failed(request: e.Request, response: e.Response): void {
        Promise.all([
            Donation.find({}),
            this.apiService.get<any>(this.options)
        ]).then((results : any[]) => {
            let locals = results[0];
            let remotes = results[1].donations;

            let failures : any[] = [];

            _(locals).forEach(l => {
                if(!_(remotes).some({id: l.donation_id}) && l.donation_id) {
                    failures.push(l)
                }
            })

            response.send(failures)
        });

    }

    @Get({path: '/tie_donations'})
    tie_donations(request: e.Request, response: e.Response): void {

        Promise.all([
            User.find({}),
            Donation.find({}),
            this.apiService.get<any>(this.options)
        ]).then((results : any[]) => {
            let users = results[0];
            let locals = results[1];
            let remotes = results[2].donations;

            let submitted = [];

            let donations = _(remotes).map(remote => {
                let local = _(locals).find(l => {
                    return l.donation_id === remote.id || l._id === remote.thirdPartyReference
                });

                let confirmed = (local 
                    && local.donation_id === remote.id 
                    && local.status === "SUBMITTED"
                ) || false;

                return {
                    confirmed,
                    local,
                    remote
                }
            });
            

            response.send(
                {users,
                donations: donations.filter(d=>!d.confirmed)}
            );
        }).catch(error => {
            response.send(error);
        });
    }
}