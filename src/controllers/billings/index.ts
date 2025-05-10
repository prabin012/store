import { Request, Response } from "express";
import { TableModel } from "../../models/tables/BillingTable";

export const createTableBilling = async (req: Request, res: Response) => {
  try {
    const {
      name,
      address,
      phoneNumber,
      items,
      paidAmount,
      paymentMethod,
      isPaid,
      isCompletedBilling,
    } = req.body;

    const newTable = new TableModel({
      name,
      address,
      phoneNumber,
      items,
      paidAmount,
      paymentMethod,
      isPaid,
      isCompletedBilling,
    });

    const saved = await newTable.save();
    res.status(201).json({ message: "Table billing saved", data: saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save billing", error });
  }
};

export const getFilteredTableBillings = async (req: Request, res: Response) => {
  try {
    const { date, isPaid, name, phoneNumber } = req.query;

    const filter: any = {};

    if (typeof name === "string") {
      filter.name = { $regex: name, $options: "i" }; // case-insensitive
    }

    if (typeof phoneNumber === "string") {
      filter.phoneNumber = { $regex: phoneNumber, $options: "i" };
    }

    if (typeof isPaid === "string") {
      filter.isPaid = isPaid === "true";
    }

    if (typeof date === "string") {
      const targetDate = new Date(date);
      const nextDay = new Date(targetDate);
      nextDay.setDate(nextDay.getDate() + 1);

      filter.createdAt = {
        $gte: targetDate,
        $lt: nextDay,
      };
    }

    const result = await TableModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ getBillings: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to filter billings", error });
  }
};
