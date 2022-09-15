import Sequelize from "sequelize";

export const sequelize = new Sequelize({
  username: "postgres",
  password: "Lccompu8888.",
  database: "postgres",
  host: "taskeep.c8rsft1yir2n.sa-east-1.rds.amazonaws.com",

  dialect: "postgres",
  storage: ":memory:",
});

/* import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "postgres://postgres:1234@localhost:5432/taskeep"
);  */
