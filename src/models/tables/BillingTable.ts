import { Schema, model, Document } from "mongoose";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface TableDocument extends Document {
  name: string;
  address: string;
  phoneNumber: string;
  items: Item[];
  paidAmount?: number;
  paymentMethod?: string | null;
  isPaid: boolean;
  isCompletedBilling: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ItemSchema = new Schema<Item>(
  {
    id: Number,
    name: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const TableSchema = new Schema<TableDocument>(
  {
    name: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    items: { type: [ItemSchema], required: true },
    paidAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, default: null },
    isPaid: { type: Boolean, default: false },
    isCompletedBilling: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TableModel = model<TableDocument>("Table", TableSchema);
