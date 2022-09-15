import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { List } from "./List.js";
import { User } from "./User.js";

export const Task = sequelize.define("Taks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  important: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  reminder: {
    type: DataTypes.STRING,
  },
  expiration_date: {
    type: DataTypes.STRING,
  },
  repeat: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.STRING,
  },
});

List.hasMany(Task, {
  foreignKey: "listid",
  sourceKey: "id",
});
Task.belongsTo(List, {
  foreignKey: "listid",
  sourceKey: "id",
});

User.hasMany(Task, {
  foreignKey: "userid",
  sourceKey: "id",
});

Task.belongsTo(User, {
  foreignKey: "userid",
  sourceKey: "id",
});
