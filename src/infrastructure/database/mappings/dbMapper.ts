import { Mapper } from '@wufe/mapper';
import { inject, injectable } from 'inversify';

import { MAPPER_IDENTIFIERS } from '@infrastructure/infrastructure.symbols';

@injectable()
export class DBMapper {
  public readonly mapper: Mapper;

  constructor() {
    this.mapper = new Mapper().withConfiguration((configuration) =>
      configuration
        .shouldIgnoreSourcePropertiesIfNotInDestination(true)
        .shouldAutomaticallyMapArrays(true),
    );

    this.initialize();
  }

  private initialize(): void {}
}
