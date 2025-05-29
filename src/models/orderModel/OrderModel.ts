import mongoose, { Schema } from "mongoose";
import { IOrder } from "../../types/Items";

const OrderSchema = new Schema<IOrder>(
  {
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    customerName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
