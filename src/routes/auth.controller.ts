import * as e from "express"
import {Controller} from "../llama";
import {Post} from "../llama/post";
import User from "../db/schemas/user";
import * as jwt from 'jsonwebtoken';
import configuration from '../config';

@Controller()
export class AuthController {

    @Post({path: '/login'})
    login(request: e.Request, response: e.Response): void {
        let {
            email,
            password
        } = request.body;

        if(!email || !password) {
            response.status(400).send({
                success: false
            });
            return
        }

        User.findOne({email}, (error, user) => {
            if(error) {
                return response.status(404).send({
                    success: false
                })
            }

            if(!user) {
                return response.status(404).send({
                    success: false
                })
            }

            user.comparePassword(password).then(matched => {
                if(matched) {
                    let token = jwt.sign({ id: user._id }, configuration.auth.secret, {
                        expiresIn: '2 days'
                    });

                    response.send({
                        token,
                        success: true
                    })
                }
                else {
                    response.status(404).send({
                        success: false
                    })
                }
            }).catch(() => {
                response.status(400).send({
                    success: false
                })
            })
        });
    }

    @Post({ path: '/register' })
    register(request: e.Request, response: e.Response): void {
        let {
            email,
            firstName,
            lastName,
            password
        } = request.body;

        if(!email || !firstName || !lastName || !password) {
            response.status(400).send({
                success: false
            });
            return
        }

        let user = new User({
            email,
            name: {
                first: firstName,
                last: lastName
            },
            password
        });

        user.save().then(result => {
            let token = jwt.sign({ id: result._id }, configuration.auth.secret, {
                expiresIn: '2 days'
            });

            response.send({
                token,
                success: true
            })

        }).catch((error) => {
            response.status(400).send({
                success: false
            });
        })
    }
}