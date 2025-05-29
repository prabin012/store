import mongoose, { Schema, model, Document } from "mongoose";

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
  tableNo: string;
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

const TableSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phoneNumber: String,
    tableNo: Number,
    paidAmount: Number,
    paymentMethod: String,
    isPaid: Boolean,
    isCompletedBilling: Boolean,
    items: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export const TableModel = model<TableDocument>("Table", TableSchema);
