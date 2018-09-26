"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
exports.DonationSchema = new mongoose.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    donation_id: Number,
    created: Date,
    submitted: Date,
    status: String,
    amount: Number,
    verified: Boolean
});
exports.DonationSchema.pre('save', function (next) {
    let donation = this;
    if (donation.isNew) {
        donation.created = new Date();
    }
    next();
});
const Donation = mongoose.model('Donation', exports.DonationSchema);
exports.default = Donation;
