export const UI_IDENTIFIERS = {
  UI_MAPPER: Symbol.for('UIMapper'),
  USER_MAPPER: Symbol.for('UserUIMapper'),
};

export const UI_APPLICATION_IDENTIFIERS = {
  EXPRESS: Symbol.for('Express'),
  EXPRESS_APPLICATION: Symbol.for('ExpressApplication'),
  INVERSIFY_APPLICATION: Symbol.for('InversifyExpressApplication'),
  IS_AUTHENTICATED: Symbol.for('ApplicationAuthProvider'),
  JWT_AUTHENTICATION_HANDLER: Symbol.for('JWTAuthenticationHandler'),
  JWT_TOKEN_UTIL: Symbol.for('JWTTokenUtil'),
  LOGGER: Symbol.for('Logger'),
  LOGGER_FORMAT: Symbol.for('WinstonFormat'),
  LOGGER_WINSTON: Symbol.for('WinstonLogger'),
  PROCESS_HANDLER: Symbol.for('ProcessHandler'),
  ROOT_ROUTER: Symbol.for('RootRouter'),
  SCHEDULER: Symbol.for('Scheduler'),
  SESSION: Symbol.for('Session'),
  UPDATE_CASES_SCHEDULER: Symbol.for('UpdateCasesScheduler'),
};

export const GRAPHQL_IDENTIFIERS = {
  GRAPHQL_ROOT_SCHEMA: Symbol.for('GraphQLRootSchema'),
  GRAPHQL_MIDDLEWARE: Symbol.for('GraphQLMiddleware'),
  GRAPHQL_OPTIONS: Symbol.for('GraphQLOptions'),
  GRAPHIQL_OPTIONS: Symbol.for('GraphiQLOptions'),
  GRAPHQL_REQUESTED_FIELDS: Symbol.for('GraphQLRequestedFields'),
  GRAPHQL_DATALOADERS: Symbol.for('GraphQLDataloaders'),
  ROLE_QUERY: Symbol.for('RoleQuery'),
  ROLE_MUTATION: Symbol.for('RoleMutation'),
  ROLE_SCHEMA: Symbol.for('RoleSchema'),
  USER_QUERY: Symbol.for('UserQuery'),
  USER_MUTATION: Symbol.for('UserMutation'),
  USER_SCHEMA: Symbol.for('UserSchema'),
};

export const UI_MAPPINGS_IDENTIFIERS = {
  USER_UI: Symbol.for('UserUI'),
};
