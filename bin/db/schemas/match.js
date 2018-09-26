"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
exports.MatchSchema = new mongoose.Schema({
    home_team: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Team'
    },
    away_team: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Team'
    },
    date: Date
}, { collection: 'matches' });
const Match = mongoose.model('Match', exports.MatchSchema);
exports.default = Match;
