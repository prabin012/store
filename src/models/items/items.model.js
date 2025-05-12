"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = void 0;
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    description: { type: String },
    imageUrl: { type: String },
    category: {
        type: String,
        ref: "Category",
        required: true,
    },
}, { timestamps: true });
exports.ItemModel = (0, mongoose_1.model)("Item", ItemSchema);
