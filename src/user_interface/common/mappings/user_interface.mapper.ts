import { inject, injectable } from 'inversify';
import { Mapper } from '@wufe/mapper';

import { IMapper } from '@core/domain/models/mapper/mapper.interface';
import { UI_IDENTIFIERS } from '@user_interface/user_interface.symbols';

@injectable()
export class UIMapper {
  public readonly mapper: Mapper;

  constructor(
    @inject(UI_IDENTIFIERS.USER_MAPPER)
    private readonly userDomainToUserUIMapper: IMapper,
  ) {
    this.mapper = new Mapper().withConfiguration((configuration) =>
      configuration
        .shouldIgnoreSourcePropertiesIfNotInDestination(true)
        .shouldAutomaticallyMapArrays(true),
    );

    this.initialize();
  }

  private initialize(): void {
    this.userDomainToUserUIMapper.configureMappings(this.mapper);
  }
}
