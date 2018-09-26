import * as nodeMailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import configuration from '../config';
import { MailOptions } from 'nodemailer/lib/stream-transport';

export class EmailService {
    options: any;
    transporter: nodeMailer.Transporter;

    constructor(){
        console.log("email", configuration.email)
        let transportOptions : smtpTransport.SmtpOptions = {
            host: configuration.email.host,
            port: configuration.email.port ? parseInt(configuration.email.port) : 0,
            auth: {
                user: configuration.email.user,
                pass: configuration.email.pass
            }
        }
        
        this.transporter = nodeMailer.createTransport(smtpTransport(transportOptions))
    }

    send(to: string, subject: string, html: string) {
        return new Promise((resolve , reject) => {
            let mailOptions: MailOptions = {
                from: '"Charity World Cup Sweepstake 2018" <me@jackallen.me>',
                to,
                subject,
                html
            };

            this.transporter.sendMail(mailOptions, (error, info) =>{ 
                if(error){
                    return reject(error);
                }

                resolve(info);
            })
        })
    }
}