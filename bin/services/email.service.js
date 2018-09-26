"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const config_1 = require("../config");
class EmailService {
    constructor() {
        console.log("email", config_1.default.email);
        let transportOptions = {
            host: config_1.default.email.host,
            port: config_1.default.email.port ? parseInt(config_1.default.email.port) : 0,
            auth: {
                user: config_1.default.email.user,
                pass: config_1.default.email.pass
            }
        };
        this.transporter = nodeMailer.createTransport(smtpTransport(transportOptions));
    }
    send(to, subject, html) {
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: '"Charity World Cup Sweepstake 2018" <me@jackallen.me>',
                to,
                subject,
                html
            };
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return reject(error);
                }
                resolve(info);
            });
        });
    }
}
exports.EmailService = EmailService;
