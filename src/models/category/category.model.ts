import { Schema, model, Document } from "mongoose";
import { ICategory } from "../../types/category";

export interface CategoryDocument extends ICategory, Document {}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export const CategoryModel = model<CategoryDocument>(
  "Category",
  CategorySchema
);
