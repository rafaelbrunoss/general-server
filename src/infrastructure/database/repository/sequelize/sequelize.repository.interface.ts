import { FindOptions, Model, ModelDefined } from 'sequelize';
import { Query } from '@infrastructure/database/repository/query';

export interface ISequelizeRepository<E, A, C> {
  model: ModelDefined<any, any>;

  delete(condition: Query<E>): Promise<boolean | undefined>;
  deleteAll(condition: Query<E>): Promise<boolean | undefined>;
  findById(id: string): Promise<Model<A, C> | null>;
  findAll(findOptions?: FindOptions, cacheOptions?: any[]): Promise<Model<A, C>[]>;
  findOneBy(
    condition: Query<Model<A, C>>,
    findOptions?: FindOptions,
  ): Promise<Model<A, C>>;
  findManyBy(condition: Query<Model<A, C>>): Promise<Model<A, C>[]>;
  findManyByIds(ids: string[], attributes?: any): Promise<Model<A, C>[]>;
  query(query: string, parameters?: any[]): Promise<Model<A, C>[] | undefined>;
  save(entity: E): Promise<Model<A, C> | undefined>;
  saveAll(entities: E[]): Promise<Model<A, C>[] | undefined>;
  update(condition: Query<E>, data: E): Promise<boolean | undefined>;
  updateAll(condition: Query<E>, data: E): Promise<boolean | undefined>;
  upsertAll(
    entities: E[],
    fieldsToBeUpdated: string[],
  ): Promise<Model<A, C>[] | undefined>;
}
