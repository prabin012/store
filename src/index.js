"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const categoryRouter_1 = __importDefault(require("./routes/categoryRouter"));
// import itemRouter from "./routes/itemRouter";
// import userRoute from "./routes/userRoute";
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/store/", categoryRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
