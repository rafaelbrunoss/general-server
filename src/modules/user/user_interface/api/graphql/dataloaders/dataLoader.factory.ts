import { inject, injectable } from 'inversify';

import { USER_DOMAIN_REPOSITORY_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import { IUserInstance } from '@modules/user/infrastructure/database/entities/sequelize/user/user';
import { UserRepository } from '@modules/user/infrastructure/database/repository/user/user.repository';

import { IDataLoaderParam } from '@user_interface/api/graphql/dataloaders/interfaces/dataLoaderParam.interface';
import { IDataLoaders } from '@user_interface/api/graphql/dataloaders/interfaces/dataLoaders.interface';
import { RequestedFields } from '@user_interface/api/graphql/ast/requestedFields';
import { UserLoader } from '@user_interface/api/graphql/dataloaders/userLoader';
import { GRAPHQL_IDENTIFIERS } from '@user_interface/user_interface.symbols';

const DataLoader = require('dataloader');

@injectable()
export class DataLoaderFactory {
  constructor(
    @inject(USER_DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @inject(GRAPHQL_IDENTIFIERS.GRAPHQL_REQUESTED_FIELDS)
    private readonly requestedFields: RequestedFields,
  ) {}

  public getLoaders(): IDataLoaders {
    return {
      // @ts-ignore
      userLoader: new DataLoader<IDataLoaderParam<number>, IUserInstance>(
        (params: IDataLoaderParam<number>[]) =>
          UserLoader.batchUsers(this.userRepository, params, this.requestedFields),
        { cacheKeyFn: (param: IDataLoaderParam<any>) => param.key },
      ),
    };
  }
}
