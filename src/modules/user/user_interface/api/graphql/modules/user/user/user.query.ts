import * as Joi from 'joi';

import { inject, injectable } from 'inversify';
import { GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';

import { USER_DOMAIN_REPOSITORY_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import { UserRepository } from '@modules/user/infrastructure/database/repository/user/user.repository';

import { userType } from '@modules/user/user_interface/api/graphql/modules/user/user/types/user.type';
import { compose } from '@user_interface/api/graphql/composable/composable.resolver';
import { authResolvers } from '@user_interface/api/graphql/composable/auth.resolver';
import { usersSchema } from '@user_interface/common/schemas/user/users.schema';
import { IGraphQLResolver } from '@user_interface/api/graphql/interfaces/graphqlResolver.interface';
import { IQuery } from '@user_interface/api/graphql/interfaces/query.interface';
import { UserInterfaceError } from '@user_interface/common/errors/userInterfaceError.model';
import { CommomHttpErrors } from '@user_interface/common/errors/commonHttpErrors';
import { UserInterfaceErrors } from '@user_interface/common/errors/userInterfaceErrors';

@injectable()
export class UserQuery {
  constructor(
    @inject(USER_DOMAIN_REPOSITORY_IDENTIFIERS.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public users(): IQuery {
    return {
      name: 'users',
      type: GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
      },
      // resolve: compose(...authResolvers)(async ({ source, args, context, info }: IGraphQLResolver) => {
      resolve: async ({ source, args, context, info }: IGraphQLResolver) => {
        try {
          Joi.assert(args, usersSchema);
          return this.userRepository.findAll({
            attributes: context.requestedFields.getFields(info, {
              keep: ['id'],
              exclude: ['__typename'],
            }),
          });
        } catch (err) {
          throw new UserInterfaceError({
            code: CommomHttpErrors.NOT_FOUND,
            name: UserInterfaceErrors.NOT_FOUND,
            message: `user NOT FOUND`,
          });
        }
      },
    };
  }
}
