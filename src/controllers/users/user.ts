import { Request, Response } from "express";
import { UserModel } from "../../models/users/user.model";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      phoneNumber,
      startDate,
      endDate,
      salary,
      salaryHistory,
      role,
    } = req.body;
    console.log(name);

    if (!name || !phoneNumber || !startDate) {
      res.status(400).json({
        success: false,
        message: "Name, phoneNumber, start date,  are required.",
      });
      return;
    }

    const existingUser = await UserModel.findOne({ name, phoneNumber });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User with this phone number already exists.",
      });
      return;
    }

    const newUser = new UserModel({
      name,
      phoneNumber,
      startDate,
      endDate,
      role,
      salary,
      salaryHistory: salaryHistory || [],
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const addSalaryRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { amount, paidDate, status, userId } = req.body;

    if (!amount || !paidDate) {
      res.status(400).json({
        success: false,
        message: "Month, amount, and paid date are required.",
      });
      return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    user.salaryHistory.push({
      amount,
      paidDate,
      status: status || "Paid",
    });

    await user.save();

    const getSalary = {
      salaryHistory: user.salaryHistory,
      userId: user._id,
    };

    res.status(200).json({
      success: true,
      message: "Salary record added successfully.",
      data: getSalary,
    });
  } catch (error) {
    console.error("Error adding salary record:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const GetAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await UserModel.find();

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
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
export const GetUserDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const getSingleUser = await UserModel.findById(id);

    if (!getSingleUser) {
      res.status(404).json({
        success: false,
        message: "No users found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: getSingleUser,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
