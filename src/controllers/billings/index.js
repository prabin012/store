"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredTableBillings = exports.createTableBilling = void 0;
const BillingTable_1 = require("../../models/tables/BillingTable");
const createTableBilling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, phoneNumber, items, paidAmount, paymentMethod, isPaid, isCompletedBilling, } = req.body;
        const newTable = new BillingTable_1.TableModel({
            name,
            address,
            phoneNumber,
            items,
            paidAmount,
            paymentMethod,
            isPaid,
            isCompletedBilling,
        });
        const saved = yield newTable.save();
        res.status(201).json({ message: "Table billing saved", data: saved });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save billing", error });
    }
});
exports.createTableBilling = createTableBilling;
const getFilteredTableBillings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, isPaid, name, phoneNumber } = req.body;
        const filter = {};
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
        const result = yield BillingTable_1.TableModel.find(filter).sort({ createdAt: -1 });
        console.log(result);
        res.status(200).json({ getBillings: result });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to filter billings", error });
    }
});
exports.getFilteredTableBillings = getFilteredTableBillings;
