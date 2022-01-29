import 'reflect-metadata';
import 'module-alias/register';

import * as http from 'http';
import { InversifyExpressServer } from 'inversify-express-utils';

import { AppContainer } from '@dependencies/app.container';

import { IOrm } from '@infrastructure/database/orm/orm.interface';
import { ICache } from '@infrastructure/cache/cache.interface';
import { ISearchEngine } from '@infrastructure/search_engine/searchEngine.interface';
import { IMonitoringTool } from '@infrastructure/monitoring/monitoringTool.interface';
import { INFRASTRUCTURE_IDENTIFIERS } from '@infrastructure/infrastructure.symbols';

import { ExpressApplication } from '@user_interface/drivers/application/expressApplication';
import {
  normalizePort,
  onError,
  onListening,
} from '@user_interface/drivers/common/functions/common';
import { ILogger } from '@user_interface/drivers/logger/logger.interface';
import { IScheduler } from '@user_interface/drivers/scheduler/scheduler.interface';
import { IProcessHandler } from '@user_interface/drivers/process/processHandler.interface';
import { PORT, HOST } from '@user_interface/drivers/common/constants/variables';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';

(async () => {
  const appContainer = new AppContainer();
  appContainer.init();
  appContainer
    .get<ExpressApplication>(UI_APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION)
    .initialize();
  await appContainer.get<IOrm>(INFRASTRUCTURE_IDENTIFIERS.ORM).initialize();
  await appContainer
    .get<ICache>(INFRASTRUCTURE_IDENTIFIERS.CACHE_DATABASE)
    .initialize();
  await appContainer
    .get<ISearchEngine>(INFRASTRUCTURE_IDENTIFIERS.SEARCH_ENGINE)
    .initialize();
  await appContainer
    .get<IMonitoringTool>(INFRASTRUCTURE_IDENTIFIERS.MONITORING_TOOL)
    .initialize();
  await appContainer
    .get<IScheduler>(UI_APPLICATION_IDENTIFIERS.SCHEDULER)
    .initialize();

  const logger = appContainer.get<ILogger>(
    UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON,
  );

  const app = appContainer
    .get<InversifyExpressServer>(UI_APPLICATION_IDENTIFIERS.INVERSIFY_APPLICATION)
    .build();

  const server = http.createServer(app);
  await appContainer
    .get<IProcessHandler>(UI_APPLICATION_IDENTIFIERS.PROCESS_HANDLER)
    .initialize(server);
  server.listen({
    port: normalizePort(PORT as string),
    hostname: HOST,
  });
  server.on('error', onError(server, logger));
  server.on('listening', onListening(server, logger));
})();
