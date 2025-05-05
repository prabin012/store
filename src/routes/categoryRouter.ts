import express from "express";
import {
  CreateCategory,
  GetAllCategory,
} from "../controllers/category/category";
import {
  addSalaryRecord,
  createUser,
  GetAllUsers,
} from "../controllers/users/user";
import { createItem, GetAllItems } from "../controllers/items/items";

const router = express.Router();

router.post("/createCategory", CreateCategory);
router.get("/getCategory", GetAllCategory);
router.post("/createItem", createItem);
router.get("/users", GetAllUsers);
router.post("/createUser", createUser);
router.post("/updateUserAccount", addSalaryRecord);
router.get("/allItmes", GetAllItems);

export default router;
