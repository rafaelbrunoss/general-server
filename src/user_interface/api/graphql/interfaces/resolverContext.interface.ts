import { IAuthUser } from '@user_interface/api/graphql/interfaces/authUser.interface';
import { IDataLoaders } from '@user_interface/api/graphql/dataloaders/interfaces/dataLoaders.interface';
import { RequestedFields } from '@user_interface/api/graphql/ast/requestedFields';

export interface IResolverContext {
  authorization?: string;
  authUser?: IAuthUser;
  dataloaders?: IDataLoaders;
  requestedFields: RequestedFields;
}
