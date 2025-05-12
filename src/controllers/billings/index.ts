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
    const { date, isPaid, name, phoneNumber } = req.body;

    const filter: any = {};

    if (typeof name === "string") {
      filter.name = { $regex: name, $options: "i" };
    }

    if (typeof phoneNumber === "string") {
      filter.phoneNumber = { $regex: phoneNumber, $options: "i" };
    }

    if (typeof isPaid === "string") {
      filter.isPaid = isPaid === "true";
    }

    if (typeof date === "string") {
      // Create UTC 00:00:00 for start of the day
      const startOfDay = new Date(date + "T00:00:00.000Z");
      const endOfDay = new Date(date + "T00:00:00.000Z");
      endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

      filter.createdAt = {
        $gte: startOfDay,
        $lt: endOfDay,
      };
    }
    console.log(date);
    console.log(filter);

    const result = await TableModel.find(filter).sort({ createdAt: -1 });
    console.log(result);

    res.status(200).json({ getBillings: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to filter billings", error });
  }
};
