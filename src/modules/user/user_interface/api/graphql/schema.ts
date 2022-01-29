import { inject, injectable } from 'inversify';
import { GraphQLSchema } from 'graphql';
import { merge } from 'lodash';

import { UserSchema } from '@modules/user/user_interface/api/graphql/modules/user/user/user.schema';
import { USER_GRAPHQL_IDENTIFIERS } from '@modules/user/user_interface/user_interface.symbols';

@injectable()
export class RootSchema {
  constructor(
    @inject(USER_GRAPHQL_IDENTIFIERS.USER_SCHEMA)
    private readonly userSchema: UserSchema,
  ) {}

  public get schema(): GraphQLSchema {
    return merge(this.userSchema.schema);
  }
}
