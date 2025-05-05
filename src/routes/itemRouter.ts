import express from "express";
import { createItem } from "../controllers/items/items";

const router = express.Router();

router.post("/createItem", createItem);

export default router;
