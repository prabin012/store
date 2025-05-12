"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/users/user");
const router = express_1.default.Router();
router.get("/users", user_1.GetAllUsers);
router.post("/createUser", user_1.createUser);
router.post("/updateUserAccount", user_1.addSalaryRecord);
exports.default = router;
