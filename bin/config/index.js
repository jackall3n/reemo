"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: {
        address: process.env.DB_STRING
    },
    auth: {
        client_id: process.env.WUNDERLIST_CLIENT_ID,
        client_secret: process.env.WUNDERLIST_CLIENT_SECRET,
        secret: process.env.JWT_SECRET || 'test'
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};
