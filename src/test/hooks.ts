import * as Synthetics from "./synthetics";
import type File from "../app/proto/file";
import type Shortcut from "../app";

export async function mochaGlobalSetup() {
  try {
    console.log("Mocha: global setup hook begin");
    global.args = Synthetics.args;
    global.FileManager = Synthetics.FileManager;
    global.Notification = Synthetics.Notification;
    global.DateFormatter = Synthetics.DateFormatter;
    const { "default": _File } = await (import("../app/proto/file") as Promise<Record<"default", typeof File>>)
      .catch((e: unknown) => {
        throw new EvalError(
          "Mocha: failed to load `File` module",
          { cause: e },
        );
      })
      .finally(() => console.log("Mocha: File: module loader executed"));

    global._File = _File;
    const { "default": _Shortcut } = await (import("../app") as Promise<Record<"default", typeof Shortcut>>)
      .catch((e: unknown) => {
        throw new EvalError(
          "Mocha: failed to load `Shortcut` module",
          { cause: e },
        );
      })
      .finally(() => console.log("Mocha: Shortcut: module loader executed"));

    global._Shortcut = _Shortcut;
    console.log("Mocha: global setup hook end");
  }
  catch (e) {
    throw new EvalError("Mocha: failed global setup", { cause: e });
  }
}
