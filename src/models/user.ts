import { Model, DataTypes } from "sequelize";
import { hash } from "../helpers/bcrypt";
import sequelize from "./index";

export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "name required",
        },
        notNull: {
          msg: "name required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "email required",
        },
        notNull: {
          msg: "email required",
        },
        isEmail: {
          msg: "input must be email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password required",
        },
        notNull: {
          msg: "password required",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.beforeCreate((user) => {
  user.password = hash(user.password);
});
