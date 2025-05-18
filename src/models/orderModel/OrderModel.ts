import { Types } from "mongoose";

export interface IOrder extends Document {
  items: { item: Types.ObjectId; quantity: number; price: number }[];
  customerName: string;
  status: "pending" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: Date;
}
