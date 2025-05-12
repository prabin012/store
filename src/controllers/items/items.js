"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllItems = exports.deleteItem = exports.updateItem = exports.createItem = void 0;
const items_model_1 = require("../../models/items/items.model");
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, quantity, price, category } = req.body;
        if (!name || !price || !category) {
            res.status(400).json({
                success: false,
                message: "Name, price, and category are required fields.",
            });
            return;
        }
        const existingItem = yield items_model_1.ItemModel.findOne({ name, category });
        if (existingItem) {
            res.status(409).json({
                success: false,
                message: "Item already exists in this category.",
            });
            return;
        }
        const newItem = new items_model_1.ItemModel({
            name,
            description,
            quantity,
            price,
            category,
        });
        yield newItem.save();
        res.status(201).json({
            success: true,
            message: "Item created successfully.",
            data: newItem,
        });
    }
    catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error,
        });
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, quantity, price, category } = req.body;
        const item = yield items_model_1.ItemModel.findById(id);
        if (!item) {
            res.status(404).json({
                success: false,
                message: "Item not found.",
            });
            return;
        }
        if (name)
            item.name = name;
        if (description)
            item.description = description;
        if (quantity !== undefined)
            item.quantity = quantity;
        if (price !== undefined)
            item.price = price;
        if (category)
            item.category = category;
        yield item.save();
        res.status(200).json({
            success: true,
            message: "Item updated successfully.",
            data: item,
        });
    }
    catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error,
        });
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const item = yield items_model_1.ItemModel.findByIdAndDelete(id);
        if (!item) {
            res.status(404).json({
                success: false,
                message: "Item not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Item deleted successfully.",
            data: item,
        });
    }
    catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error,
        });
    }
});
exports.deleteItem = deleteItem;
const GetAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getItems = yield items_model_1.ItemModel.find();
        if (!getItems || getItems.length === 0) {
            res.status(404).json({ message: "No items found." });
            return;
        }
        res.status(200).json({ getItems });
    }
    catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetAllItems = GetAllItems;
