import {Schema, Document, model} from "mongoose";

export interface IGroup extends Document {
    letter: string;
    teams: any[]
}

export const GroupSchema = new Schema({
    letter: String,
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }]
});

const Group = model<IGroup>('Group', GroupSchema);

export default Group;