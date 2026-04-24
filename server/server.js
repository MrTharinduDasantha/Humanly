import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dashboardRouter from "./routes/dashboard.route.js";
import adminRouter from "./routes/admin.route.js";
import categoryRouter from "./routes/category.route.js";
import employeeRouter from "./routes/employee.route.js";
import employeeAuthRouter from "./routes/employeeAuth.route.js";
import leaveRouter from "./routes/leave.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running!"));

app.use("/api/dashboard", dashboardRouter);
app.use("/api/admin", adminRouter);
app.use("/api/employee-category", categoryRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/employee-auth", employeeAuthRouter);
app.use("/api/leave", leaveRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
