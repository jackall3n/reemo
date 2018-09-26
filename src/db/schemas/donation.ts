import * as mongoose from "mongoose";
import {Schema} from "mongoose";

export interface IDonation extends mongoose.Document {
    user: any;
    created: Date;
    submitted: Date;
    status: string;
    donation_id?: number;
    amount: number;
    verified: boolean;
}

export const DonationSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    donation_id: Number,
    created: Date,
    submitted: Date,
    status: String,
    amount: Number,
    verified: Boolean
});

DonationSchema.pre('save', function(next) {
    let donation : any = this;

    if (donation.isNew) {
        donation.created = new Date();
    }

    next();
});

const Donation = mongoose.model<IDonation>('Donation', DonationSchema);

export default Donation;