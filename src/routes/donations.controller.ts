import * as e from "express"
import {Controller} from "../llama";
import {Post} from "../llama/post";
import Donation from "../db/schemas/donation";
import User from "../db/schemas/user";
import { prerelease } from "semver";

@Controller()
export class DonationsController {

    @Post({ path: "/placeholder", authorise: true })
    placeholder(request: e.Request, response: e.Response): void {
        let { amount } = request.body;

        User.findById(request.user.id).populate('donations').exec().then(user => {
            var donation = new Donation({
                status: "CREATED",
                user: user.id,
                amount
            })

            donation.save().then(_donation => {
                user.donations.push(_donation._id);
                user.save().then(_user => {
                    response.send({
                        donation: {
                            id: _donation._id
                        },
                        success: true
                    })
                }).catch(error => {
                    response.status(400).send({
                        success: false
                    })
                });
            }).catch(error => {
                response.status(400).send({
                    success: false
                })
            });
        }).catch(error => {
            response.status(400).send({
                success: false
            })
        });
    }

    @Post({path: "/save", authorise: true})
    save(request: e.Request, response: e.Response): void {
        let { donation_id, reference } = request.body;

        Donation.findById(reference).exec().then(donation => {
            donation.donation_id = donation_id;
            donation.status = "SUBMITTED";
            donation.submitted = new Date();

            donation.save().then(_donation => {
                response.send({
                    _donation,
                    success: true
                })
            })
        }).catch(error => {
            response.status(400).send({
                success: false
            })
        });

        if(!donation_id) {
            response.status(400).send({
                success: false
            })
            return;
        }
    }
}