import { model, Schema } from "mongoose";
import { IUser } from "../../types/user";

interface IUserSchema extends IUser, Document {}

const userSchema = new Schema<IUserSchema>(
  {
    name: {
      type: String,
      requied: true,
    },
    phoneNumber: {
      type: Number,
      requied: true,
    },
    startDate: {
      type: String,
      requied: true,
    },
    endDate: {
      type: String,
    },
    role: {
      type: String,
    },
    salary: {
      type: Number,
    },
    salaryHistory: [
      {
        month: { type: String, required: true },
        amount: { type: Number, required: true },
        paidDate: { type: Date, required: true },
        status: { type: String, enum: ["Paid", "Pending"], default: "Paid" },
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = model<IUserSchema>("User", userSchema);
