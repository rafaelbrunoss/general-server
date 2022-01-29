import { GraphQLResolveInfo } from 'graphql';
import { IResolverContext } from '@user_interface/api/graphql/interfaces/resolverContext.interface';

export interface IGraphQLResolver {
  source: any;
  args: any;
  context: IResolverContext;
  info: GraphQLResolveInfo;
}
