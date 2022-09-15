/* import { List } from "./../models/List.js";
import { Task } from "./../models/Task.js";
import { User } from "./../models/User.js";

Task.hasOne(List, { as: "list", foreignKey: "id" });

List.belongsTo(Task, { as: "task", foreignKey: "id" });

User.hasMany(Task, { as: "task", foreignKey: "id" });

Task.belongsTo(User, { as: "user" });
 */
