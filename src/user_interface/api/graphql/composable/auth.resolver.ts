import { GraphQLFieldResolver } from 'graphql';

import { ComposableResolver } from '@user_interface/api/graphql/composable/composable.resolver';
import { IResolverContext } from '@user_interface/api/graphql/interfaces/resolverContext.interface';
import { verifyTokenResolver } from '@user_interface/api/graphql/composable/verify-token.resolver';
import { UserInterfaceError } from '@user_interface/common/errors/userInterfaceError.model';
import { UserInterfaceErrors } from '@user_interface/common/errors/userInterfaceErrors';
import { CommomHttpErrors } from '@user_interface/common/errors/commonHttpErrors';

export const authResolver: ComposableResolver<any, IResolverContext> = (
  resolver: GraphQLFieldResolver<any, IResolverContext>,
): GraphQLFieldResolver<any, IResolverContext> => {
  return (parent, args, context: IResolverContext, info) => {
    if (context.authUser || context.authorization) {
      return resolver(parent, args, context, info);
    }
    throw new UserInterfaceError({
      name: UserInterfaceErrors.BAD_REQUEST,
      code: CommomHttpErrors.BAD_REQUEST,
      message: 'Unauthorized! Token not provided!',
    });
  };
};

export const authResolvers = [authResolver, verifyTokenResolver];
