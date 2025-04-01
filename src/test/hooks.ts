import * as Synthetics from "./synthetics";

export const mochaHooks = {
  beforeAll() {
    global.args = Synthetics.args;
    global.FileManager = Synthetics.FileManager;
    global.Notification = Synthetics.Notification;
    global.DateFormatter = Synthetics.DateFormatter;
  },
};
