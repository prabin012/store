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
exports.GetAllUsers = exports.addSalaryRecord = exports.createUser = void 0;
const user_model_1 = require("../../models/users/user.model");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phoneNumber, startDate, endDate, salary, salaryHistory, role, } = req.body;
        console.log(name);
        if (!name || !phoneNumber || !startDate) {
            res.status(400).json({
                success: false,
                message: "Name, phoneNumber, start date,  are required.",
            });
            return;
        }
        const existingUser = yield user_model_1.UserModel.findOne({ name, phoneNumber });
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "User with this phone number already exists.",
            });
            return;
        }
        const newUser = new user_model_1.UserModel({
            name,
            phoneNumber,
            startDate,
            endDate,
            role,
            salary,
            salaryHistory: salaryHistory || [],
        });
        yield newUser.save();
        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: newUser,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.createUser = createUser;
const addSalaryRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { month, amount, paidDate, status } = req.body;
        if (!month || !amount || !paidDate) {
            res.status(400).json({
                success: false,
                message: "Month, amount, and paid date are required.",
            });
            return;
        }
        const user = yield user_model_1.UserModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found." });
            return;
        }
        user.salaryHistory.push({
            month,
            amount,
            paidDate,
            status: status || "Paid",
        });
        yield user.save();
        res.status(200).json({
            success: true,
            message: "Salary record added successfully.",
            data: user.salaryHistory,
        });
    }
    catch (error) {
        console.error("Error adding salary record:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.addSalaryRecord = addSalaryRecord;
const GetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.UserModel.find();
        if (!users || users.length === 0) {
            res.status(404).json({
                success: false,
                message: "No users found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully.",
            data: users,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});
exports.GetAllUsers = GetAllUsers;
