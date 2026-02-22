import {
  args,
  config,
  Data,
  DateFormatter,
  FileManager,
  Image,
  Location,
  Notification,
  Size,
} from "./mocks";

export function installGlobals() {
  global.args = args;
  global.config = config;
  global.Data = Data;
  global.DateFormatter = DateFormatter;
  global.FileManager = FileManager;
  global.Image = Image;
  global.Location = Location;
  global.Notification = Notification;
  global.Size = Size;
}
