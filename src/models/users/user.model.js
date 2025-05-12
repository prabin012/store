"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        requied: true,
    },
    phoneNumber: {
        type: Number,
        requied: true,
    },
    startDate: {
        type: String,
        requied: true,
    },
    endDate: {
        type: String,
    },
    role: {
        type: String,
    },
    salary: {
        type: Number,
    },
    salaryHistory: [
        {
            month: { type: String, required: true },
            amount: { type: Number, required: true },
            paidDate: { type: Date, required: true },
            status: { type: String, enum: ["Paid", "Pending"], default: "Paid" },
        },
    ],
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
