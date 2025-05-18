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
