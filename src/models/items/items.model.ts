import { Schema, model, Document, Types } from "mongoose";
import { IItem } from "../../types/Items";

export interface ItemDocument extends IItem, Document {}

const ItemSchema = new Schema<ItemDocument>(
  {
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
    updateHistory: [
      {
        updatedAt: { type: Date, default: Date.now },
        updatedFields: [
          {
            field: String,
            oldValue: Schema.Types.Mixed,
            newValue: Schema.Types.Mixed,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const ItemModel = model<ItemDocument>("Item", ItemSchema);
