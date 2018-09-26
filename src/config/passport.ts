import {ExtractJwt, Strategy} from 'passport-jwt';
import config from "./";
import User from "../db/schemas/user";

export default function (passport: any) {
    let options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: config.auth.secret
    };

    passport.use(new Strategy(options, (payload, done) => {
        User.findById(payload.id, (error, user) => {
            if (error) {
                return done(error, false);
            }

            if (user) {
                return done(null, user)
            }
            else {
                return done(null, false);
            }
        })
    }))
}