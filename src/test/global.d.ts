declare const global: Global;
declare interface Global {
  DateFormatter: typeof DateFormatter;
  FileManager: typeof FileManager;
  Notification: typeof Notification;
  args: typeof args;
  _Shortcut: typeof Shortcut;
  _File: typeof File;
}
