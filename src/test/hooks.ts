import * as Synthetics from "./synthetics";

export function mochaGlobalSetup() {
  try {
    console.log("Mocha: global setup hook begin");
    global.args = Synthetics.args;
    global.FileManager = Synthetics.FileManager;
    global.Notification = Synthetics.Notification;
    global.DateFormatter = Synthetics.DateFormatter;
    console.log("Mocha: global setup hook end");
  }
  catch (e) {
    throw new EvalError("Mocha: failed global setup", { cause: e });
  }
}
