import { Request, Response } from "express";
import { TableModel } from "../../models/tables/BillingTable";
import { ItemModel } from "../../models/items/items.model";

export const createTableBilling = async (req: Request, res: any) => {
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
      tableNo,
    } = req.body;

    console.log(items);

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided for billing" });
    }

    for (const item of items) {
      const stockItem = await ItemModel.findOne({ id: item.id });

      if (!stockItem) {
        return res
          .status(404)
          .json({ message: `Stock item not found: ${item.name}` });
      }

      if (stockItem.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for item: ${item.name}` });
      }

      stockItem.quantity -= item.quantity;
      await stockItem.save();
    }

    const newTable = new TableModel({
      name,
      address,
      phoneNumber,
      items,
      paidAmount,
      paymentMethod,
      isPaid,
      isCompletedBilling,
      tableNo,
    });

    const saved = await newTable.save();

    res.status(201).json({
      message: "Table billing saved successfully",
      data: saved,
    });
  } catch (error) {
    console.error("Billing error:", error);
    res.status(500).json({
      message: "Failed to save billing",
      error: error instanceof Error ? error.message : String(error),
    });
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
