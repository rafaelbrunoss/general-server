import * as DataLoader from 'dataloader';

import { IUserInstance } from '@modules/user/infrastructure/database/entities/sequelize/user/user';

import { IDataLoaderParam } from '@user_interface/api/graphql/dataloaders/interfaces/dataLoaderParam.interface';

export interface IDataLoaders {
  userLoader: DataLoader<IDataLoaderParam<number>, IUserInstance>;
}
