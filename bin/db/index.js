"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Database {
    constructor(uri) {
        this.uri = uri;
        this.db_options = { keepAlive: 1 };
    }
    connect() {
        mongoose.connect(this.uri, this.db_options);
    }
    on(event_name, callback) {
        mongoose.connection.on(event_name, callback);
    }
    onError(callback) {
        this.on('error', callback);
    }
    onConnected(callback) {
        this.on('connected', callback);
    }
    onDisconnected(callback) {
        this.on('disconnected', callback);
    }
    open(callback) {
        mongoose.connection.once('open', callback);
    }
}
exports.default = Database;
