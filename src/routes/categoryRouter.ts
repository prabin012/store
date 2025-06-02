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
import {
  createItem,
  GetAllItems,
  GetSingleItem,
  updateItem,
} from "../controllers/items/items";
import {
  createTableBilling,
  getFilteredTableBillings,
} from "../controllers/billings";

const router = express.Router();

router.post("/createCategory", CreateCategory);
router.get("/getCategory", GetAllCategory);
router.post("/createItem", createItem);
router.get("/users", GetAllUsers);
router.post("/createUser", createUser);
router.post("/updateUserAccount", addSalaryRecord);
router.get("/getItems", GetAllItems);
router.post("/addBilling", createTableBilling);
router.post("/getBillings", getFilteredTableBillings);
router.get("/getSingleItem/:id", GetSingleItem);
router.post("/updateItems/", updateItem);

export default router;
