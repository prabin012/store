"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableModel = void 0;
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
}, { _id: false });
const TableSchema = new mongoose_1.Schema({
    name: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    items: { type: [ItemSchema], required: true },
    paidAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, default: null },
    isPaid: { type: Boolean, default: false },
    isCompletedBilling: { type: Boolean, default: false },
}, { timestamps: true });
exports.TableModel = (0, mongoose_1.model)("Table", TableSchema);
