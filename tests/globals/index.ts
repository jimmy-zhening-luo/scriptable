import { args } from "./args";
import { config } from "./config";
import { Data } from "./data";
import { DateFormatter } from "./date-formatter";
import { FileManager } from "./file-manager";
import { Image } from "./image";
import { Location } from "./location";
import { Notification } from "./notification";
import { Size } from "./size";

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
