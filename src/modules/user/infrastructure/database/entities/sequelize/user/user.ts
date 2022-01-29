import {
  Model,
  ModelDefined,
  DataTypes,
  Optional,
  Sequelize,
  InitOptions,
} from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcryptjs';
import { Role } from '@modules/user/infrastructure/database/entities/sequelize/user/role';

export interface IUserAttributes {
  id: number;
  RoleId?: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}

export interface IUserInstance
  extends ModelDefined<IUserAttributes, IUserCreationAttributes> {}

export class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly RoleId?: number;

  public static get attributes(): any {
    return {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    };
  }

  public static initOptions(sequelize: Sequelize): InitOptions<User> {
    return {
      sequelize,
      tableName: 'users',
      hooks: {
        beforeCreate: (user: User): void => {
          user.password = User.encryptPassword(user.password);
        },
        beforeUpdate: (user: User): void => {
          if (user.changed('password')) {
            user.password = User.encryptPassword(user.password);
          }
        },
      },
    };
  }

  public static initialize(sequelize: Sequelize): void {
    User.init(User.attributes, User.initOptions(sequelize));
  }

  public static createAssociations(): void {
    User.belongsTo(Role, {
      as: 'Role',
      foreignKey: {
        name: 'RoleId',
        field: 'id',
        allowNull: false,
      },
      constraints: false,
    });
  }

  private static encryptPassword(password: string): string {
    return hashSync(password, genSaltSync());
  }

  public isPassword(encodedPassword: string, password: string): boolean {
    return compareSync(password, encodedPassword);
  }
}
