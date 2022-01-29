export interface ICache {
  initialize(): Promise<void>;
  get(key: string): Promise<any>;
  set(key: string, value: any): Promise<void>;
  close(): Promise<void>;
  healthCheck(): Promise<void>;
}
