import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import bcrypt from "bcryptjs";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    validate: {
      isUUID: 4,
      notNull: { msg: "cannot be null" },
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  collaborative_account: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  request_send: {
    type: DataTypes.STRING,
  },
  request_received: {
    type: DataTypes.STRING,
  },
  collaborators: {
    type: DataTypes.STRING,
  },
});

User.prototype.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
User.prototype.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};
