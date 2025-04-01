import * as Synthetics from "./synthetics";

export const mochaHooks = {
  beforeAll() {
    global.FileManager = Synthetics.FileManager;
    global.Notification = Synthetics.Notification;
    global.args = Synthetics.args;
    global.DateFormatter = Synthetics.DateFormatter;
  }
};
