export const USER_DOMAIN_APPLICATION_SERVICE_IDENTIFIERS = {
  USER_SERVICE: Symbol.for('UserService'),
};

export const USER_DOMAIN_REPOSITORY_IDENTIFIERS = {
  ROLE_REPOSITORY: Symbol.for('IRoleRepository'),
  USER_REPOSITORY: Symbol.for('IUserRepository'),
};

export const USER_DOMAIN_UNIT_OF_WORK_IDENTIFIERS = {
  USER_UNIT_OF_WORK: Symbol.for('IUserUnitOfWork'),
};

export const USER_DOMAIN_MAPPING_IDENTIFIERS = {
  ROLE_DOMAIN: Symbol.for('RoleDomain'),
  USER_DOMAIN: Symbol.for('UserDomain'),
};
