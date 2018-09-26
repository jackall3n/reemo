"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const _1 = require("./");
const user_1 = require("../db/schemas/user");
function default_1(passport) {
    let options = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: _1.default.auth.secret
    };
    passport.use(new passport_jwt_1.Strategy(options, (payload, done) => {
        user_1.default.findById(payload.id, (error, user) => {
            if (error) {
                return done(error, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
}
exports.default = default_1;
