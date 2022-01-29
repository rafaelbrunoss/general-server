import { interfaces } from 'inversify';

import { BaseModule } from '@dependencies/base.module';

import { IOrm } from '@infrastructure/database/orm/orm.interface';
import { SequelizeORM } from '@infrastructure/database/orm/sequelize.orm';
import { DBMapper } from '@infrastructure/database/mappings/dbMapper';
import {
  INFRASTRUCTURE_IDENTIFIERS,
  MAPPER_IDENTIFIERS,
} from '@infrastructure/infrastructure.symbols';

import { UIMapper } from '@user_interface/common/mappings/user_interface.mapper';
import { UI_IDENTIFIERS } from '@user_interface/user_interface.symbols';

export class CommonModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideOrm(bind);

    this.provideDBMapper(bind);
    this.provideUIMapper(bind);
  }

  private provideOrm(bind: interfaces.Bind): void {
    bind<IOrm>(INFRASTRUCTURE_IDENTIFIERS.ORM).to(SequelizeORM);
  }

  private provideUIMapper(bind: interfaces.Bind): void {
    bind<UIMapper>(UI_IDENTIFIERS.UI_MAPPER).to(UIMapper);
  }

  private provideDBMapper(bind: interfaces.Bind): void {
    bind<DBMapper>(MAPPER_IDENTIFIERS.DB_MAPPER).to(DBMapper);
  }
}
