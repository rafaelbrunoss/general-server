import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';

export const roleInputType = new GraphQLInputObjectType({
  name: 'roleInput',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
