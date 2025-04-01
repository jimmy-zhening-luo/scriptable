import type Shortcut from "../app";
import type File from "../app/base/file";

declare const global: Global;
declare interface Global {
  DateFormatter: typeof DateFormatter;
  FileManager: typeof FileManager;
  Notification: typeof Notification;
  args: typeof args;
  Shortcut: typeof Shortcut;
  File: typeof File;
}
