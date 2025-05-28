import { Request, Response } from "express";
import { CategoryModel } from "../../models/category/category.model";

export const CreateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;

    if (!name || typeof name !== "string") {
      res
        .status(400)
        .json({ message: "Category name is required and must be a string." });
      return;
    }

    const existing = await CategoryModel.findOne({ name });
    if (existing) {
      res
        .status(409)
        .json({ message: "Category with this name already exists." });
      return;
    }

    const category = new CategoryModel({ name, description });
    await category.save();

    res.status(201).json({
      message: "Category created successfully.",
      data: category,
    });
  } catch (error) {
    console.error("CreateCategory error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const GetAllCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getCategory = await CategoryModel.find();
    if (!getCategory || getCategory.length === 0) {
      res.status(404).json({ message: "No categorie found." });
      return;
    }
    res.status(200).json({ getCategory });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const UpdateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await CategoryModel.findById(id);
    if (!category) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    if (name) category.name = name;
    if (description) category.description = description;

    await category.save();

    res.status(200).json({
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    console.error("UpdateCategory error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const DeleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      res.status(404).json({ message: "Category not found." });
      return;
    }

    res.status(200).json({
      message: "Category deleted successfully.",
      data: category,
    });
  } catch (error) {
    console.error("DeleteCategory error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
