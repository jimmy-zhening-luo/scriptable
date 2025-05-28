declare const global: Global;
declare interface Global {
  // #region Scriptable
  args: typeof args;
  config: typeof config;
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
