import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export const authType = new GraphQLObjectType({
  name: 'auth',
  fields: () => ({
    token: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
