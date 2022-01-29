import { IGraphQLResolver } from '@user_interface/api/graphql/interfaces/graphqlResolver.interface';

export interface IMutation {
  name: string;
  type: any;
  args: any;
  resolve: ({ source, args, context, info }: IGraphQLResolver) => Promise<any>;
}
