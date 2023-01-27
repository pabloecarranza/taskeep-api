import Sequelize from "sequelize";
export const sequelize = new Sequelize("postgres", "postgres", "Lccompu8888.", {
  host: "taskeep.c8rsft1yir2n.sa-east-1.rds.amazonaws.com",
  dialect: "postgres",
});
