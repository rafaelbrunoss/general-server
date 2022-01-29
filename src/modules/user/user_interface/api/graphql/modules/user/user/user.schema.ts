import { inject, injectable } from 'inversify';
import { GraphQLSchema } from 'graphql';
import { ObjectTypeComposer, schemaComposer } from 'graphql-compose';
import { userType } from '@modules/user/user_interface/api/graphql/modules/user/user/types/user.type';

// this export MUST be before importing mutations and queries
export const UserTC = schemaComposer.createObjectTC(userType);

import { UserQuery } from '@modules/user/user_interface/api/graphql/modules/user/user/user.query';
import { UserMutation } from '@modules/user/user_interface/api/graphql/modules/user/user/user.mutation';
import { USER_GRAPHQL_IDENTIFIERS } from '@modules/user/user_interface/user_interface.symbols';

@injectable()
export class UserSchema {
  private _schema: GraphQLSchema;
  private _typeComposer: ObjectTypeComposer<any, any>;

  constructor(
    @inject(USER_GRAPHQL_IDENTIFIERS.USER_QUERY)
    private readonly userQuery: UserQuery,
    @inject(USER_GRAPHQL_IDENTIFIERS.USER_MUTATION)
    private readonly userMutation: UserMutation,
  ) {
    this._typeComposer = schemaComposer.createObjectTC(userType);

    this._typeComposer.addResolver(this.userQuery.users());
    this._typeComposer.addResolver(this.userMutation.createUser());
    this._typeComposer.addResolver(this.userMutation.updateUser());
    this._typeComposer.addResolver(this.userMutation.deleteUser());
    this._typeComposer.addResolver(this.userMutation.signIn());

    schemaComposer.Query.addFields({
      users: this._typeComposer.getResolver('users'),
    });

    schemaComposer.Mutation.addFields({
      createUser: this._typeComposer.getResolver('createUser'),
      deleteUser: this._typeComposer.getResolver('deleteUser'),
      updateUser: this._typeComposer.getResolver('updateUser'),
      signIn: this._typeComposer.getResolver('signIn'),
    });

    this._schema = schemaComposer.buildSchema();
  }

  public get schema(): GraphQLSchema {
    return this._schema;
  }
}
