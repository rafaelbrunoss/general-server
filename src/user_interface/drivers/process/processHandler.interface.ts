import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';

export interface IProcessHandler {
  initialize(server: HttpServer | HttpsServer): Promise<void>;
}
