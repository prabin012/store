import express from "express";
import { connectDB } from "./config/db";
import categoryRouter from "./routes/categoryRouter";
// import itemRouter from "./routes/itemRouter";
// import userRoute from "./routes/userRoute";
import cors from "cors";

const app = express();
const PORT = 5000;
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/store/", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
