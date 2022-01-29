export interface IApplication {
  initializeBodyParsers(): void;
  initializeLogging(): void;
  initializePlugins(): void;
  initializeExtensions(): void;
  initializeSecurity(): void;
  initializeControllers(): void;
  initializeErrorHandlers(): void;
}
