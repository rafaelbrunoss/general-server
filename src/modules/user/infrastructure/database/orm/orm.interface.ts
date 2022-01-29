export interface IOrm {
  initialize(): Promise<void>;
  close(): Promise<void>;
  healthCheck(): Promise<any>;
}
