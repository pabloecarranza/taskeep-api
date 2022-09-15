import { User } from "./../models/User.js";
import Jwt from "jsonwebtoken";
import config from "../config.js";
import { serialize } from "cookie";

export const signUp = async (req, res) => {
  const { username, password, email } = req.body;
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const parsedName = username.trim().replace(/ /g, "");

  const userFound = await User.findOne({
    where: {
      username: parsedName,
    },
  });
  if (userFound)
    return res
      .status(401)
      .json({ message: "User already exists, please choose another name" });

  if (!validEmail.test(email)) {
    return res
      .status(401)
      .json({ message: "Please enter a valid email address " });
  }

  const NewUser = await User.create({
    username: parsedName,
    email,
    password: await User.prototype.encryptPassword(password),
  });

  const token = Jwt.sign({ id: NewUser.id }, config.SECRET, {
    expiresIn: 84600,
  });

  const serialized = serialize("auth-token", token, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);

  res.status(200).json({ message: "Sign up successfully" });
};

export const signIn = async (req, res) => {
  const userFound = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!userFound) {
    return res.status(401).send({ message: "User not found" });
  }

  const matchPassword = await User.prototype.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ message: "Invalid password" });

  const token = Jwt.sign({ id: userFound.id }, config.SECRET, {
    expiresIn: 86400,
  });

  /*  res.send("cookieName", token, { sameSite: "none", secure: true }); */

  res.json({
    message: "Login successfully",
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    token: token,
  });
};

export const profileHandler = async (req, res) => {
  const { mytokenName } = req.cookies;
  try {
    const user = verify(mytokenName, config.SECRET);
    return res.json({ username: user.username, email: user.email });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
