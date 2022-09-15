import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const List = sequelize.define("Lists", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
