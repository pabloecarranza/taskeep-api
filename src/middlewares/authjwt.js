import Jwt from "jsonwebtoken";
import config from "../config.js";
import { User } from "./../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["auth-token"];

    if (!token) return res.starus(403).json({ message: "no token provided" });
    const decoded = Jwt.verify(token, config.SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (!user) return res.status(404).json({ message: "no user found" });
    console.log(user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
