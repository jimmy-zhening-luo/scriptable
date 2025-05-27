import * as Synthetics from "./synthetics";
import type File from "../app/proto/file";
import type Shortcut from "../app";

type Import<T> = Promise<Record<"default", T>>;

export async function mochaGlobalSetup() {
  try {
    console.log("Mocha hooks: BEGIN");
    global.args = Synthetics.args;
    global.FileManager = Synthetics.FileManager;
    global.Notification = Synthetics.Notification;
    global.DateFormatter = Synthetics.DateFormatter;

    const {
      "default": MockFile,
    } = await (
      import("../app/proto/file") as Import<typeof File>
    )
      .catch(
        (e: unknown) => {
          throw new ReferenceError(
            "Mocha hooks: failed to load `File` module",
            { cause: e },
          );
        },
      )
      .finally(
        () => console.log("Mocha hooks: `File` module dynamically loaded"),
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
      import("../app") as Import<typeof Shortcut>
    )
      .catch(
        (e: unknown) => {
          throw new ReferenceError(
            "Mocha hooks: failed to load `Shortcut` module",
            { cause: e },
          );
        },
      )
      .finally(
        () => console.log("Mocha hooks: `Shortcut` module dynamically loaded"),
      );

    global.MockConcreteShortcut = class MockConcreteShortcut extends MockShortcut<
      string,
      string
      > {
      protected override stringInput = true;

      protected runtime() {
        return "CONCRETE_SHORTCUT_OUTPUT";
      }
    };
    console.log("Mocha hooks: COMPLETED");
  }
  catch (error) {
    throw new EvalError(
      "Mocha hooks: FAILED",
      { cause: error },
    );
  }
}
