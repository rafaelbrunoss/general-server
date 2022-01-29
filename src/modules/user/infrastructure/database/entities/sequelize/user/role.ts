import {
  Association,
  Model,
  ModelDefined,
  DataTypes,
  Optional,
  Sequelize,
  InitOptions,
} from 'sequelize';
import { User } from '@modules/user/infrastructure/database/entities/sequelize/user/user';

export interface IRoleAttributes {
  id: number;
  name: string;
}

export interface IRoleCreationAttributes extends Optional<IRoleAttributes, 'id'> {}

export interface IRoleInstance
  extends ModelDefined<IRoleAttributes, IRoleCreationAttributes> {}

export class Role
  extends Model<IRoleAttributes, IRoleCreationAttributes>
  implements IRoleAttributes
{
  public static associations: {
    user: Association<Role, User>;
  };

  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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
    };
  }

  public static initOptions(sequelize: Sequelize): InitOptions<Role> {
    return {
      sequelize,
      tableName: 'roles',
    };
  }

  public static initialize(sequelize: Sequelize): void {
    Role.init(Role.attributes, Role.initOptions(sequelize));
  }

  public static createAssociations(): void {
    Role.hasMany(User, {
      foreignKey: 'RoleId',
      as: 'users',
    });
  }
}
