import * as Synthetics from "./synthetics";
import type File from "../app/proto/file";
import type Shortcut from "../app";

export async function mochaGlobalSetup() {
  try {
    console.log("Mocha: BEGIN Global Setup");
    global.args = Synthetics.args;
    global.FileManager = Synthetics.FileManager;
    global.Notification = Synthetics.Notification;
    global.DateFormatter = Synthetics.DateFormatter; 

    const {
      "default": MockFile,
    } = await (
      import("../app/proto/file") as Promise<
        Record<
          "default",
          typeof File
        >
      >
    )
      .catch(
        (e: unknown) => {
          throw new EvalError(
            "Mocha: File: Failed to load `File` module",
            { cause: e },
          );
        },
      )
      .finally(
        () => console.log("Mocha: File: Executed Module Loader"),
      );

    global.mockFile = new MockFile(
      "Storage",
      "SYNTHETIC_FILENAME.txt",
      "SYNTHETIC_SUBFOLDER",
      true,
    );

    const {
      "default": MockShortcut,
    } = await (
      import("../app") as Promise<
        Record<
          "default",
          typeof Shortcut
        >
      >
    )
      .catch(
        (e: unknown) => {
          throw new EvalError(
            "Mocha: Shortcut: Failed to load `Shortcut` module",
            { cause: e },
          );
        },
      )
      .finally(
        () => console.log("Mocha: Shortcut: Executed Module Loader"),
      );

    global.MockConcreteShortcut = class MockConcreteShortcut extends MockShortcut<string, string> {
      protected override stringInput = true;

      protected runtime() {
        return "CONCRETE_SHORTCUT_OUTPUT";
      }
    };
    console.log("Mocha: END Global Setup");
  }
  catch (error) {
    throw new EvalError(
      "Mocha: GLOBAL SETUP FAILURE",
      { cause: error },
    );
  }
}
