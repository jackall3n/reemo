"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
exports.TeamSchema = new mongoose.Schema({
    name: String,
    code: String,
    group: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Group'
    }
});
const Team = mongoose.model('Team', exports.TeamSchema);
exports.default = Team;
