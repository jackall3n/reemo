import * as mongoose from "mongoose";

class Database {
    db_options: any;

    constructor(private uri: string) {
        this.db_options = {keepAlive: 1}
    }

    connect() {
        mongoose.connect(this.uri, this.db_options)
    }

    on(event_name: string, callback: (args: any) => void) {
        mongoose.connection.on(event_name, callback)
    }

    onError(callback: (args: any) => void) {
        this.on('error', callback)
    }

    onConnected(callback: (args: any) => void) {
        this.on('connected', callback)
    }

    onDisconnected(callback: (args: any) => void) {
        this.on('disconnected', callback)
    }

    open(callback: () => void) {
        mongoose.connection.once('open', callback);
    }
}

export default Database;