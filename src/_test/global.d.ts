declare const global: Global;
declare interface Global {
  DateFormatter: typeof DateFormatter;
  FileManager: typeof FileManager;
  Notification: typeof Notification;
  args: typeof args;
  MockConcreteShortcut: new () => unknown;
  mockFile: unknown;
}

declare class MockConcreteShortcut {
  protected runtime(): string;
}

declare const mockFile: {
  readonly mutable: boolean;
};
