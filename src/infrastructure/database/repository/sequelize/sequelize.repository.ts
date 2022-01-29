import { inject, injectable } from 'inversify';
import {
  ModelDefined,
  Model,
  Op,
  FindOptions,
  Transaction,
  CreationAttributes,
} from 'sequelize';

import { ISequelizeRepository } from '@infrastructure/database/repository/sequelize/sequelize.repository.interface';
import { ICache } from '@infrastructure/cache/cache.interface';
import { Query } from '@infrastructure/database/repository/query';
import { InfrastructureError } from '@infrastructure/common/errors/infrastructureError.model';
import { InfrastructureErrors } from '@infrastructure/common/errors/infrastructureErrors.enum';
import { INFRASTRUCTURE_IDENTIFIERS } from '@infrastructure/infrastructure.symbols';

@injectable()
export abstract class SequelizeRepository<E, A, C>
  implements ISequelizeRepository<E, A, C>
{
  @inject(INFRASTRUCTURE_IDENTIFIERS.CACHE_DATABASE)
  private readonly cache!: ICache;

  constructor(public readonly model: ModelDefined<any, any>) {}

  public async findById(id: string): Promise<Model<A, C> | null> {
    let result = await this.cache.get(`${this.model.name} ${id}`);
    if (!result) {
      result = await this.model.findOne({
        where: { id },
        raw: true,
      });
      if (result) {
        this.cache.set(`${this.model.name} ${id}`, result);
      }
    }
    return result;
  }

  public async findOneBy(
    condition: Query<E>,
    findOptions?: FindOptions,
  ): Promise<Model<A, C>> {
    let result = await this.cache.get(
      `${this.model.name} ${JSON.stringify(condition)}`,
    );
    if (!result) {
      result = await this.model.findOne({
        ...findOptions,
        where: condition,
        raw: true,
      });
      if (result) {
        this.cache.set(`${this.model.name} ${JSON.stringify(condition)}`, result);
      }
    }
    return result;
  }

  public async findManyBy(condition: Query<E>): Promise<Model<A, C>[]> {
    let result = await this.cache.get(
      `${this.model.name} ${JSON.stringify(condition)}`,
    );
    if (!result) {
      result = await this.model.findAll({
        where: condition,
        raw: true,
      });
      if (result) {
        this.cache.set(`${this.model.name} ${JSON.stringify(condition)}`, result);
      }
    }
    return result;
  }

  public async findManyByIds(
    ids: string[],
    attributes?: any,
  ): Promise<Model<A, C>[]> {
    let result = await this.cache.get(
      `${this.model.name} ${ids.length} - ${ids[0]} - ${ids[ids.length - 1]}`,
    );
    if (!result) {
      result = await this.model.findAll({
        where: { id: { [Op.in]: ids } },
        attributes,
        raw: true,
      });
      if (result) {
        this.cache.set(
          `${this.model.name} ${ids.length} - ${ids[0]} - ${ids[ids.length - 1]}`,
          result,
        );
      }
    }
    return result;
  }

  public async findAll(
    findOptions?: FindOptions,
    cacheOptions?: any[],
  ): Promise<Model<A, C>[]> {
    let result = cacheOptions
      ? await this.cache.get(
          `${this.model.name} findAll ${cacheOptions.length} - ${
            cacheOptions[0]
          } - ${cacheOptions[cacheOptions.length - 1]}`,
        )
      : await this.cache.get(
          `${this.model.name} findAll ${JSON.stringify(findOptions)}`,
        );
    if (!result) {
      result = await this.model.findAll({
        ...findOptions,
        raw: true,
      });
      if (result) {
        cacheOptions
          ? this.cache.set(
              `${this.model.name} findAll ${cacheOptions.length} - ${
                cacheOptions[0]
              } - ${cacheOptions[cacheOptions.length]}`,
              result,
            )
          : this.cache.set(
              `${this.model.name} findAll ${JSON.stringify(findOptions)}`,
              result,
            );
      }
    }
    return result;
  }

  public async update(condition: Query<E>, data: E): Promise<boolean | undefined> {
    try {
      if (this.model.sequelize !== undefined) {
        return this.model.sequelize.transaction(
          async (transaction: Transaction) =>
            !!(await this.model.update(data, {
              where: condition,
              transaction,
            })),
        );
      }
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async updateAll(
    condition: Query<E>,
    data: E,
  ): Promise<boolean | undefined> {
    try {
      if (this.model.sequelize !== undefined) {
        return this.model.sequelize.transaction(
          async (transaction: Transaction) =>
            !!(await this.model.update(data, {
              where: condition,
              transaction,
            })),
        );
      }
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async delete(condition: Query<E>): Promise<boolean | undefined> {
    try {
      if (this.model.sequelize !== undefined) {
        return this.model.sequelize.transaction(async (transaction: Transaction) => {
          try {
            return !!(await this.model.destroy({
              where: condition,
              transaction,
            }));
          } catch (err) {
            throw new InfrastructureError({
              name: InfrastructureErrors.TRANSACTION_ERROR,
              code: InfrastructureErrors.TRANSACTION_ERROR,
              message: `Transaction ERROR: ${err}`,
            });
          }
        });
      }
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async deleteAll(condition: Query<E>): Promise<boolean | undefined> {
    try {
      if (this.model.sequelize !== undefined) {
        return this.model.sequelize.transaction(async (transaction: Transaction) => {
          try {
            return !!(await this.model.destroy({
              where: condition,
              transaction,
            }));
          } catch (err) {
            throw new InfrastructureError({
              name: InfrastructureErrors.TRANSACTION_ERROR,
              code: InfrastructureErrors.TRANSACTION_ERROR,
              message: `Transaction ERROR: ${err}`,
            });
          }
        });
      }
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async save(entity: E): Promise<Model<A, C> | undefined> {
    try {
      if (this.model.sequelize !== undefined) {
        return this.model.sequelize.transaction(async (transaction: Transaction) =>
          this.model.create(entity as CreationAttributes<Model<any, any>>, {
            transaction,
          }),
        );
      }
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async saveAll(entities: E[]): Promise<Model<A, C>[] | undefined> {
    try {
      if (this.model.sequelize !== undefined) {
        return this.model.sequelize.transaction(async (transaction: Transaction) =>
          this.model.bulkCreate(entities as CreationAttributes<Model<any, any>>[], {
            transaction,
          }),
        );
      }
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async upsertAll(
    entities: E[],
    fieldsToBeUpdated: string[],
  ): Promise<Model<A, C>[] | undefined> {
    try {
      if (this.model.sequelize !== undefined) {
        return this.model.sequelize.transaction(async (transaction: Transaction) =>
          this.model.bulkCreate(entities as CreationAttributes<Model<any, any>>[], {
            transaction,
            updateOnDuplicate: fieldsToBeUpdated,
          }),
        );
      }
    } catch (error) {
      throw new InfrastructureError({
        name: InfrastructureErrors.TRANSACTION_ERROR,
        code: InfrastructureErrors.TRANSACTION_ERROR,
        message: `Transaction ERROR: ${error}`,
      });
    }
  }

  public async query(
    query: string,
    parameters?: any[],
  ): Promise<Model<A, C>[] | undefined> {
    if (this.model.sequelize !== undefined) {
      return this.model.sequelize.query(query, {
        model: this.model,
        mapToModel: true,
        raw: true,
      });
    }
  }
}
