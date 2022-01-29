import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} from 'graphql';

export const createUserInput = new GraphQLInputObjectType({
  name: 'createUserInput',
  description: '',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    roleName: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export const updateUserInput = new GraphQLInputObjectType({
  name: 'updateUserInput',
  description: '',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    roleName: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export const deleteUserInput = new GraphQLInputObjectType({
  name: 'deleteUserInput',
  description: '',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  }),
});

export const signInInput = new GraphQLInputObjectType({
  name: 'signInInput',
  description: '',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    roleName: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
