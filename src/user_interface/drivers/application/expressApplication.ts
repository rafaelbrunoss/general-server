import express from 'express';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import overloadProtection from 'overload-protection';
import { inject, injectable } from 'inversify';
import { graphqlHTTP } from 'express-graphql';

import { Prometheus } from '@infrastructure/monitoring/prometheus';
import { INFRASTRUCTURE_IDENTIFIERS } from '@infrastructure/infrastructure.symbols';

import { IApplication } from '@user_interface/drivers/application/application.interface';
import { BaseApplication } from '@user_interface/drivers/application/baseApplication';
import { ILogger } from '@user_interface/drivers/logger/logger.interface';
import { NODE_ENV } from '@user_interface/drivers/common/constants/variables';
import { RequestedFields } from '@user_interface/api/graphql/ast/requestedFields';
import { DataLoaderFactory } from '@user_interface/api/graphql/dataloaders/dataLoader.factory';
import { RootSchema } from '@user_interface/api/graphql/schema';
import { UserInterfaceError } from '@user_interface/common/errors/userInterfaceError.model';
import { UserInterfaceErrors } from '@user_interface/common/errors/userInterfaceErrors';
import { CommomHttpErrors } from '@user_interface/common/errors/commonHttpErrors';
import {
  GRAPHQL_IDENTIFIERS,
  UI_APPLICATION_IDENTIFIERS,
} from '@user_interface/user_interface.symbols';

@injectable()
export class ExpressApplication
  extends BaseApplication<express.Application>
  implements IApplication
{
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON)
    private readonly logger: ILogger,
    @inject(UI_APPLICATION_IDENTIFIERS.EXPRESS)
    public readonly app: express.Application,
    @inject(INFRASTRUCTURE_IDENTIFIERS.MONITORING_TOOL)
    private readonly prometheus: Prometheus,
    @inject(GRAPHQL_IDENTIFIERS.GRAPHQL_ROOT_SCHEMA)
    private readonly graphqlSchema: RootSchema,
    @inject(GRAPHQL_IDENTIFIERS.GRAPHQL_DATALOADERS)
    private readonly dataLoaderFactory: DataLoaderFactory,
    @inject(GRAPHQL_IDENTIFIERS.GRAPHQL_REQUESTED_FIELDS)
    private readonly requestedFields: RequestedFields,
  ) {
    super(app);
  }

  public initialize(): void {
    this.initializeSecurity();
    this.initializeBodyParsers();
    this.initializeLogging();
    this.initializePlugins();
    this.initializeControllers();
    this.initializeExtensions();
    this.initializeErrorHandlers();
  }

  public initializeSecurity(): void {
    this.app.use(express.urlencoded({ extended: false }));
  }

  public initializeBodyParsers(): void {
    this.app.use(express.json());
  }

  public initializeLogging(): void {
    this.logger.initialize();
  }

  public initializePlugins(): void {
    this.app.use(methodOverride());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: '*', // CHANGE the '*' to the url that will access thi api
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Encoding'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
      }),
    );
    this.app.use(compression());
    this.app.use(
      overloadProtection('express', {
        production: NODE_ENV === 'production',
        clientRetrySecs: 1,
        sampleInterval: 5,
        maxEventLoopDelay: 42,
        maxHeapUsedBytes: 0,
        maxRssBytes: 0,
        errorPropagationMode: false,
        logging: false,
        logStatsOnReq: false,
      }),
    );
  }

  public initializeControllers(): void {
    this.app.use(
      '/graphql',
      // extractJwtMiddleware(),
      (
        req: express.Request | any,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        if (!req['context']) {
          req['context'] = {};
        }
        req['context']['dataloaders'] = this.dataLoaderFactory.getLoaders();
        req['context']['requestedFields'] = this.requestedFields;
        next();
      },
      graphqlHTTP((req: express.Request | any) => ({
        schema: this.graphqlSchema.schema,
        graphiql: NODE_ENV === 'development',
        context: req['context'],
      })),
    );
  }

  public initializeExtensions(): void {
    this.app.use(this.prometheus.requestCounters);
    this.app.use(this.prometheus.responseCounters);
    this.app.get('/metrics', this.prometheus.metricsRoute());
    this.prometheus.startMetricsCollection();
  }

  public initializeErrorHandlers(): void {
    this.app.use(
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(
          new UserInterfaceError({
            name: UserInterfaceErrors.NOT_FOUND,
            code: CommomHttpErrors.NOT_FOUND,
            message: `Express did not found ${req.path}`,
          }),
        );
      },
    );

    this.app.use(
      (
        error: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        res.status(error.status || 500);
        res.json({
          error: {
            message: error.message,
          },
        });
      },
    );
  }
}
