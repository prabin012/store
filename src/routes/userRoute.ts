import express from "express";
import {
  addSalaryRecord,
  createUser,
  GetAllUsers,
} from "../controllers/users/user";

const router = express.Router();

router.get("/users", GetAllUsers);
router.post("/createUser", createUser);
router.post("/updateUserAccount", addSalaryRecord);

export default router;
