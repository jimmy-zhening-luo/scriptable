/*
export * from "./args";
export * from "./data";
export * from "./date-formatter";
export * from "./file-manager";
export * from "./image";
export * from "./notification";
export * from "./size";

*/

declare const global: Global;
declare interface Global {
  // #region Scriptable
  args: typeof args;
  Data: typeof Data;
  DateFormatter: typeof DateFormatter;
  FileManager: typeof FileManager;
  Image: typeof Image;
  Notification: typeof Notification;
  Size: typeof Size;
  // #endregion

  // #region App
  MockConcreteShortcut: new () => unknown;
  mockFile: unknown;
  // #endregion
}

declare class MockConcreteShortcut {
  protected runtime(): string;
}

declare const mockFile: {
  readonly mutable: boolean;
};
