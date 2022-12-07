import express from "express";
import cors from "cors";
import usersRoutes from "./routes/user.routes.js";
import tasksRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import listRoutes from "./routes/list.routes.js";

import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cors());

const corsOptions = {
  origin: "https://taskeep.vercel.app/",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(authRoutes);
app.use(usersRoutes);
app.use(tasksRoutes);
app.use(listRoutes);

export default app;
