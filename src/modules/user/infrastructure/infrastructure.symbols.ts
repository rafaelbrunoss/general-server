export const USER_MAPPER_IDENTIFIERS = {
  DB_MAPPER: Symbol.for('DBMapper'),
  ROLE_MAPPER: Symbol.for('RoleEntityMapper'),
  USER_MAPPER: Symbol.for('UserEntityMapper'),
};

export const USER_DATABASE_MAPPING_IDENTIFIERS = {
  ROLE_ENTITY: Symbol.for('RoleEntity'),
  USER_ENTITY: Symbol.for('UserEntity'),
};

export const USER_INFRASTRUCTURE_IDENTIFIERS = {
  CACHE_DATABASE: Symbol.for('CacheDatabase'),
  MONITORING_TOOL: Symbol.for('MonitoringTool'),
  ORM: Symbol.for('Orm'),
  SEARCH_ENGINE: Symbol.for('SearchEngine'),
};
