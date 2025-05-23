import * as Synthetics from "./synthetics";
import type File from "../app/base/file";
import type Shortcut from "../app";

export async function mochaGlobalSetup() {
  try {
    console.log("Mocha: BEGIN Global Setup");
    global.args = Synthetics.args;
    global.FileManager = Synthetics.FileManager;
    global.Notification = Synthetics.Notification;
    global.DateFormatter = Synthetics.DateFormatter;

    const { "default": _File } = await (import("../app/base/file") as Promise<Record<"default", typeof File>>)
      .catch((e: unknown) => {
        throw new EvalError(
          "Mocha: File: Failed to load `File` module",
          { cause: e },
        );
      })
      .finally(() => console.log("Mocha: File: Executed Module Loader"));

    global.mockFile = new _File(
      "Storage",
      {
        file: "SYNTHETIC_FILENAME.txt",
        folder: "SYNTHETIC_SUBFOLDER",
      },
      true,
    );

    const { "default": _Shortcut } = await (import("../app") as Promise<Record<"default", typeof Shortcut>>)
      .catch((e: unknown) => {
        throw new EvalError(
          "Mocha: Shortcut: Failed to load `Shortcut` module",
          { cause: e },
        );
      })
      .finally(() => console.log("Mocha: Shortcut: Executed Module Loader"));

    global.MockConcreteShortcut = class MockConcreteShortcut extends _Shortcut<string, string> {
      protected override stringInput = true;

      protected runtime() {
        return "CONCRETE_SHORTCUT_OUTPUT";
      }
    };
    console.log("Mocha: END Global Setup");
  }
  catch (e) {
    throw new EvalError("Mocha: GLOBAL SETUP FAILURE", { cause: e });
  }
}
