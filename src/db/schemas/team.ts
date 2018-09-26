import * as mongoose from "mongoose";
import {Schema} from "mongoose";

export interface ITeam extends mongoose.Document {
    name: string;
    group: any;
    code: string;
}

export const TeamSchema = new mongoose.Schema({
    name: String,
    code: String,
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
});

const Team = mongoose.model<ITeam>('Team', TeamSchema);

export default Team;