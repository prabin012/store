import { Request, Response } from "express";
import { ItemModel } from "../../models/items/items.model";

export const createItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, quantity, price, category } = req.body;
    if (!name || !price || !category) {
      res.status(400).json({
        success: false,
        message: "Name, price, and category are required fields.",
      });
      return;
    }
    const existingItem = await ItemModel.findOne({ name, category });
    if (existingItem) {
      res.status(409).json({
        success: false,
        message: "Item already exists in this category.",
      });
      return;
    }
    const newItem = new ItemModel({
      name,
      description,
      quantity,
      price,
      category,
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      message: "Item created successfully.",
      data: newItem,
    });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, quantity, price, category } = req.body;

    const item = await ItemModel.findById(id);
    if (!item) {
      res.status(404).json({
        success: false,
        message: "Item not found.",
      });
      return;
    }

    if (name) item.name = name;
    if (description) item.description = description;
    if (quantity !== undefined) item.quantity = quantity;
    if (price !== undefined) item.price = price;
    if (category) item.category = category;

    await item.save();

    res.status(200).json({
      success: true,
      message: "Item updated successfully.",
      data: item,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const item = await ItemModel.findByIdAndDelete(id);
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
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error,
    });
  }
};

export const GetAllItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getItems = await ItemModel.find();
    if (!getItems || getItems.length === 0) {
      res.status(404).json({ message: "No items found." });
      return;
    }
    res.status(200).json({ getItems });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
