import { SyntheticDateFormatter } from "./date-formatter";
import { SyntheticFileManager } from "./file-manager";
import { SyntheticNotification } from "./notification";
import { syntheticArgs } from "./args";

export namespace Synthetics {
  export type DateFormatter = SyntheticDateFormatter;
  export type FileManager = SyntheticFileManager;
  export type Notification = SyntheticNotification;
  export type args = syntheticArgs;
}
