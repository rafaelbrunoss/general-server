import * as Joi from 'joi';

import { inject, injectable } from 'inversify';
import { GraphQLBoolean, GraphQLNonNull } from 'graphql';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from '@core/core.module.symbols';

import { User } from '@modules/user/core/domain/models/user.model';
import { AuthService } from '@core/application/services/auth/authService';
import { UserService } from '@modules/user/core/application/services/user/user.service';
import { CreateUserRequest } from '@modules/user/core/application/services/user/request/createUserRequest';
import { ChangeUserRequest } from '@modules/user/core/application/services/user/request/changeUserRequest';
import { RemoveUserRequest } from '@modules/user/core/application/services/user/request/removeUserRequest';
import { AuthenticationRequest } from '@core/application/services/auth/requests/authenticationRequest';
import { USER_DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from '@modules/user/core/user.core.module.symbols';

import {
  createUserInput,
  deleteUserInput,
  signInInput,
  updateUserInput,
} from '@modules/user/user_interface/api/graphql/modules/user/user/user.inputs';
import { UserTC } from '@modules/user/user_interface/api/graphql/modules/user/user/user.schema';
import { userType } from '@modules/user/user_interface/api/graphql/modules/user/user/types/user.type';
import { authType } from '@modules/user/user_interface/api/graphql/modules/user/user/types/auth.type';
import { compose } from '@user_interface/api/graphql/composable/composable.resolver';
import { authResolvers } from '@user_interface/api/graphql/composable/auth.resolver';
import { createUserSchema } from '@user_interface/common/schemas/user/createUser.schema';
import { deleteUserSchema } from '@user_interface/common/schemas/user/deleteUser.schema';
import { signInSchema } from '@user_interface/common/schemas/user/signIn.schema';
import { updateUserSchema } from '@user_interface/common/schemas/user/updateUser.schema';
import { IGraphQLResolver } from '@user_interface/api/graphql/interfaces/graphqlResolver.interface';
import { IMutation } from '@user_interface/api/graphql/interfaces/mutation.interface';
import { IAuthenticationHandler } from '@user_interface/drivers/auth/authenticationHandler.interface';
import { Authentication } from '@user_interface/drivers/auth/models/authentication';
import { UserInterfaceError } from '@user_interface/common/errors/userInterfaceError.model';
import { CommomHttpErrors } from '@user_interface/common/errors/commonHttpErrors';
import { UserInterfaceErrors } from '@user_interface/common/errors/userInterfaceErrors';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';

@injectable()
export class UserMutation {
  constructor(
    @inject(USER_DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE)
    private readonly userService: UserService,
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTH_SERVICE)
    private readonly authService: AuthService,
    @inject(UI_APPLICATION_IDENTIFIERS.JWT_AUTHENTICATION_HANDLER)
    private readonly authenticationHandler: IAuthenticationHandler,
  ) {}

  public createUser(): IMutation {
    return {
      name: 'createUser',
      type: UserTC,
      args: {
        input: { type: new GraphQLNonNull(createUserInput) },
      },
      resolve: async ({ source, args, context, info }: IGraphQLResolver) => {
        try {
          Joi.assert(args.input, createUserSchema);
          return this.userService.createUser(
            new CreateUserRequest({
              name: args.input.name,
              email: args.input.email,
              password: args.input.password,
              roleName: args.input.roleName,
            }),
          );
        } catch (err) {
          throw new UserInterfaceError({
            code: CommomHttpErrors.METHOD_NOT_ALLOWED,
            name: UserInterfaceErrors.METHOD_NOT_ALLOWED,
            message: `USER unable to create`,
          });
        }
      },
    };
  }

  public updateUser(): IMutation {
    return {
      name: 'updateUser',
      type: GraphQLBoolean,
      args: {
        input: { type: new GraphQLNonNull(updateUserInput) },
      },
      resolve: async ({ source, args, context, info }: IGraphQLResolver) => {
        try {
          Joi.assert(args.input, updateUserSchema);
          return this.userService.changeUser(
            new ChangeUserRequest({
              id: args.input.id,
              name: args.input.name,
              email: args.input.email,
              password: args.input.password,
              roleName: args.input.roleName,
            }),
          );
        } catch (err) {
          throw new UserInterfaceError({
            code: CommomHttpErrors.NOT_FOUND,
            name: UserInterfaceErrors.NOT_FOUND,
            message: `USER with id ${args.input.id} not found! Unable to update.`,
          });
        }
      },
    };
  }

  public deleteUser(): IMutation {
    return {
      name: 'deleteUser',
      type: GraphQLBoolean,
      args: {
        input: { type: new GraphQLNonNull(deleteUserInput) },
      },
      resolve: async ({ source, args, context, info }: IGraphQLResolver) => {
        try {
          Joi.assert(args.input, deleteUserSchema);
          return this.userService.removeUser(new RemoveUserRequest(args.input.id));
        } catch (err) {
          throw new UserInterfaceError({
            code: CommomHttpErrors.METHOD_NOT_ALLOWED,
            name: UserInterfaceErrors.METHOD_NOT_ALLOWED,
            message: `USER with id ${args.input.id} not found! Unable to delete.`,
          });
        }
      },
    };
  }

  public signIn(): IMutation {
    return {
      name: 'signIn',
      type: new GraphQLNonNull(authType),
      args: {
        input: { type: new GraphQLNonNull(signInInput) },
      },
      resolve: async ({ source, args, context, info }: IGraphQLResolver) => {
        try {
          Joi.assert(args.input, signInSchema);
          const authentication: Authentication =
            await this.authenticationHandler.authenticate(
              new AuthenticationRequest({
                email: args.input.email,
                password: args.input.password,
              }),
            );

          return {
            token: authentication.token,
          };
        } catch (err) {
          throw new UserInterfaceError({
            code: CommomHttpErrors.METHOD_NOT_ALLOWED,
            name: UserInterfaceErrors.METHOD_NOT_ALLOWED,
            message: `USER unable to sign in`,
          });
        }
      },
    };
  }
}
