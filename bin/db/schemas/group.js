"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.GroupSchema = new mongoose_1.Schema({
    letter: String,
    teams: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Team'
        }]
});
const Group = mongoose_1.model('Group', exports.GroupSchema);
exports.default = Group;
