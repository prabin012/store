import { Types } from "mongoose";

export interface IItem {
  name: string;
  price: number;
  quantity: number;
  category?: Types.ObjectId;
  description?: string;
  imageUrl?: string;
}

interface IReservation extends Document {
  customerName: string;
  tableNumber: number;
  date: Date;
  time: string;
  status: "reserved" | "cancelled" | "completed";
}
export interface IOrderItem {
  item: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  items: IOrderItem[];
  customerName: string;
  status: "pending" | "completed" | "cancelled";
  totalAmount: number;
  createdAt: Date;
}
