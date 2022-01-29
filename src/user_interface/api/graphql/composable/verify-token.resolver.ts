import * as jwt from 'jsonwebtoken';
import { GraphQLFieldResolver } from 'graphql';

import { ComposableResolver } from '@user_interface/api/graphql/composable/composable.resolver';
import { IResolverContext } from '@user_interface/api/graphql/interfaces/resolverContext.interface';
import { UserInterfaceError } from '@user_interface/common/errors/userInterfaceError.model';
import { UserInterfaceErrors } from '@user_interface/common/errors/userInterfaceErrors';
import { CommomHttpErrors } from '@user_interface/common/errors/commonHttpErrors';
import { APP_TOKEN_SECRET } from '@user_interface/drivers/common/constants/variables';

export const verifyTokenResolver: ComposableResolver<any, IResolverContext> = (
  resolver: GraphQLFieldResolver<any, IResolverContext>,
): GraphQLFieldResolver<any, IResolverContext> => {
  return (parent, args, context: IResolverContext, info) => {
    const token: string = context.authorization
      ? context.authorization.split(' ')[1]
      : '';
    return jwt.verify(token, APP_TOKEN_SECRET as string, (err, decoded: any) => {
      if (!err) {
        return resolver(parent, args, context, info);
      }
      throw new UserInterfaceError({
        name: UserInterfaceErrors.UNAUTHORIZED,
        code: CommomHttpErrors.UNAUTHORIZED,
        message: `${err.name}: ${err.message}`,
      });
    });
  };
};
