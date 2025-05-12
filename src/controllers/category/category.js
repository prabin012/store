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
exports.DeleteCategory = exports.UpdateCategory = exports.GetAllCategory = exports.CreateCategory = void 0;
const category_model_1 = require("../../models/category/category.model");
const CreateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name || typeof name !== "string") {
            res
                .status(400)
                .json({ message: "Category name is required and must be a string." });
            return;
        }
        const existing = yield category_model_1.CategoryModel.findOne({ name });
        if (existing) {
            res
                .status(409)
                .json({ message: "Category with this name already exists." });
            return;
        }
        const category = new category_model_1.CategoryModel({ name, description });
        yield category.save();
        res.status(201).json({
            message: "Category created successfully.",
            data: category,
        });
    }
    catch (error) {
        console.error("CreateCategory error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.CreateCategory = CreateCategory;
const GetAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getCategory = yield category_model_1.CategoryModel.find();
        if (!getCategory || getCategory.length === 0) {
            res.status(404).json({ message: "No categories found." });
            return;
        }
        res.status(200).json({ getCategory });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.GetAllCategory = GetAllCategory;
const UpdateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = yield category_model_1.CategoryModel.findById(id);
        if (!category) {
            res.status(404).json({ message: "Category not found." });
            return;
        }
        if (name)
            category.name = name;
        if (description)
            category.description = description;
        yield category.save();
        res.status(200).json({
            message: "Category updated successfully.",
            data: category,
        });
    }
    catch (error) {
        console.error("UpdateCategory error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.UpdateCategory = UpdateCategory;
const DeleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_model_1.CategoryModel.findByIdAndDelete(id);
        if (!category) {
            res.status(404).json({ message: "Category not found." });
            return;
        }
        res.status(200).json({
            message: "Category deleted successfully.",
            data: category,
        });
    }
    catch (error) {
        console.error("DeleteCategory error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.DeleteCategory = DeleteCategory;
