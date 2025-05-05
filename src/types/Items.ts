import { Types } from "mongoose";

export interface IItem {
  name: string;
  price: number;
  quantity: number;
  category?: Types.ObjectId;
  description?: string;
  imageUrl?: string;
}
