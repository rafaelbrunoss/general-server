import '@user_interface/api/graphql/controller';

import express from 'express';
import { Format } from 'logform';
import { interfaces } from 'inversify';
import { createLogger, format, Logger } from 'winston';

import { BaseModule } from '@dependencies/base.module';

import { IApplication } from '@user_interface/drivers/application/application.interface';
import { ILogger } from '@user_interface/drivers/logger/logger.interface';
import { ExpressApplication } from '@user_interface/drivers/application/expressApplication';
import { WinstonLogger } from '@user_interface/drivers/logger/winston.logger';
import { JWTTokenUtil } from '@user_interface/drivers/auth/utils/jwtTokenUtil';
import { JWTAuthenticationHandler } from '@user_interface/drivers/auth/jwtAuthenticationHandler';
import { IAuthenticationHandler } from '@user_interface/drivers/auth/authenticationHandler.interface';
import { IScheduler } from '@user_interface/drivers/scheduler/scheduler.interface';
import { Scheduler } from '@user_interface/drivers/scheduler/scheduler';
import { RootSchema } from '@user_interface/api/graphql/schema';
import { RequestedFields } from '@user_interface/api/graphql/ast/requestedFields';
import { DataLoaderFactory } from '@user_interface/api/graphql/dataloaders/dataLoader.factory';
import { IProcessHandler } from '@user_interface/drivers/process/processHandler.interface';
import { ProcessHandler } from '@user_interface/drivers/process/processHandler';
import {
  GRAPHQL_IDENTIFIERS,
  UI_APPLICATION_IDENTIFIERS,
} from '@user_interface/user_interface.symbols';

import { UserSchema } from '@modules/user/user_interface/api/graphql/modules/user/user/user.schema';
import { UserMutation } from '@modules/user/user_interface/api/graphql/modules/user/user/user.mutation';
import { UserQuery } from '@modules/user/user_interface/api/graphql/modules/user/user/user.query';

import { ICache } from '@infrastructure/cache/cache.interface';
import { IMonitoringTool } from '@infrastructure/monitoring/monitoringTool.interface';
import { ISearchEngine } from '@infrastructure/search_engine/searchEngine.interface';
import { Redis } from '@infrastructure/cache/redis';
import { Prometheus } from '@infrastructure/monitoring/prometheus';
import { Elasticsearch } from '@infrastructure/search_engine/elasticsearch';
import { INFRASTRUCTURE_IDENTIFIERS } from '@infrastructure/infrastructure.symbols';

export class ApplicationModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideExpress(bind);
    this.provideProcessHandler(bind);
    this.provideLoggerFormat(bind);
    this.provideLogger(bind);
    this.provideWinstonLogger(bind);
    this.provideJWTTokenUtil(bind);
    this.provideJWTAuthenticationHandler(bind);
    this.provideCacheDatabase(bind);
    this.provideMonitoringTool(bind);
    this.provideSearchEngine(bind);
    this.provideGraphQLSchemas(bind);
    this.provideGraphQLUtils(bind);

    this.provideScheduler(bind);

    this.provideExpressApplication(bind);
  }

  private provideExpress(bind: interfaces.Bind): void {
    bind<express.Application>(UI_APPLICATION_IDENTIFIERS.EXPRESS).toConstantValue(
      express(),
    );
  }

  private provideProcessHandler(bind: interfaces.Bind): void {
    bind<IProcessHandler>(UI_APPLICATION_IDENTIFIERS.PROCESS_HANDLER).to(
      ProcessHandler,
    );
  }

  private provideLogger(bind: interfaces.Bind): void {
    bind<Logger>(UI_APPLICATION_IDENTIFIERS.LOGGER).toConstantValue(
      createLogger({
        exitOnError: false,
        level: 'info',
      }),
    );
  }

  private provideLoggerFormat(bind: interfaces.Bind): void {
    bind<Format>(UI_APPLICATION_IDENTIFIERS.LOGGER_FORMAT).toConstantValue(
      format.combine(format.timestamp(), format.json()),
    );
  }

  private provideWinstonLogger(bind: interfaces.Bind): void {
    bind<ILogger>(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON).to(WinstonLogger);
  }

  private provideExpressApplication(bind: interfaces.Bind): void {
    bind<IApplication>(UI_APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION).to(
      ExpressApplication,
    );
  }

  private provideJWTTokenUtil(bind: interfaces.Bind): void {
    bind<JWTTokenUtil>(UI_APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL).to(JWTTokenUtil);
  }

  private provideJWTAuthenticationHandler(bind: interfaces.Bind): void {
    bind<IAuthenticationHandler>(
      UI_APPLICATION_IDENTIFIERS.JWT_AUTHENTICATION_HANDLER,
    ).to(JWTAuthenticationHandler);
  }

  private provideCacheDatabase(bind: interfaces.Bind): void {
    bind<ICache>(INFRASTRUCTURE_IDENTIFIERS.CACHE_DATABASE).to(Redis);
  }

  private provideMonitoringTool(bind: interfaces.Bind): void {
    bind<IMonitoringTool>(INFRASTRUCTURE_IDENTIFIERS.MONITORING_TOOL).to(Prometheus);
  }

  private provideSearchEngine(bind: interfaces.Bind): void {
    bind<ISearchEngine>(INFRASTRUCTURE_IDENTIFIERS.SEARCH_ENGINE).to(Elasticsearch);
  }

  private provideScheduler(bind: interfaces.Bind): void {
    bind<IScheduler>(UI_APPLICATION_IDENTIFIERS.SCHEDULER).to(Scheduler);
  }

  private provideGraphQLSchemas(bind: interfaces.Bind): void {
    bind<UserMutation>(GRAPHQL_IDENTIFIERS.USER_MUTATION).to(UserMutation);
    bind<UserQuery>(GRAPHQL_IDENTIFIERS.USER_QUERY).to(UserQuery);
    bind<UserSchema>(GRAPHQL_IDENTIFIERS.USER_SCHEMA).to(UserSchema);

    bind<RootSchema>(GRAPHQL_IDENTIFIERS.GRAPHQL_ROOT_SCHEMA).to(RootSchema);
  }

  private provideGraphQLUtils(bind: interfaces.Bind): void {
    bind<RequestedFields>(GRAPHQL_IDENTIFIERS.GRAPHQL_REQUESTED_FIELDS).to(
      RequestedFields,
    );
    bind<DataLoaderFactory>(GRAPHQL_IDENTIFIERS.GRAPHQL_DATALOADERS).to(
      DataLoaderFactory,
    );
  }
}
