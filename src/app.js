import express from "express";
import cors from "cors";
import usersRoutes from "./routes/user.routes.js";
import tasksRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import listRoutes from "./routes/list.routes.js";

import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());


const corsOptions ={
   origin:'*', 
   credentials:true,        
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(cookieParser("SECRET"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(authRoutes);
app.use(usersRoutes);
app.use(tasksRoutes);
app.use(listRoutes);

export default app;
