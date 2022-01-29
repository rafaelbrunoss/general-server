import { injectable, inject } from 'inversify';
import { Sequelize, Dialect } from 'sequelize';

import { IOrm } from '@infrastructure/database/orm/orm.interface';
import { InfrastructureError } from '@infrastructure/common/errors/infrastructureError.model';
import { InfrastructureErrors } from '@infrastructure/common/errors/infrastructureErrors.enum';

import { ILogger } from '@user_interface/drivers/logger/logger.interface';
import {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DB,
  DB_DIALECT,
} from '@user_interface/drivers/common/constants/variables';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';

@injectable()
export class SequelizeORM implements IOrm {
  private sequelize: Sequelize | undefined;
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON)
    private readonly logger: ILogger,
  ) {}

  public async initialize(): Promise<void> {
    this.sequelize = new Sequelize(
      `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}`,
      {
        dialect: DB_DIALECT as Dialect,
        logging: false,
      },
    );

    // Initialize
    // Role.initialize(this.sequelize);
    // User.initialize(this.sequelize);

    // Create Associations
    // Role.createAssociations();
    // User.createAssociations();

    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync();
      this.logger.info(`[Connected to the main database]`);
    } catch (error) {
      this.logger.info(`[Unable to connect to the main database:] ${error}`);
    }
  }

  public async close(): Promise<void> {
    await this.sequelize?.close();
    this.logger.info(`[Disconnected to the main database]`);
  }

  public async healthCheck(): Promise<any> {
    try {
      await this.sequelize?.authenticate();
    } catch (error) {
      this.logger.info(`[Unable to connect to the main database:] ${error}`);
    }
  }
}
