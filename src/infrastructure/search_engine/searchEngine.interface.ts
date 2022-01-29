export interface ISearchEngine {
  initialize(): Promise<void>;
  close(): Promise<void>;
  healthCheck(): Promise<any>;
}
