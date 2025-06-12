import * as MockGlobals from "./globals";
import type File from "../lib/file";
import type Shortcut from "../core";

type Import<Module> = Promise<
  ReadonlyRecord<
    "default",
    Module
  >
>;

export async function mochaGlobalSetup() {
  try {
    console.log("Mocha hooks: BEGIN");
    global.args = MockGlobals.args;
    global.config = MockGlobals.config;
    global.Data = MockGlobals.Data;
    global.DateFormatter = MockGlobals.DateFormatter;
    global.FileManager = MockGlobals.FileManager;
    global.Image = MockGlobals.Image;
    global.Notification = MockGlobals.Notification;
    global.Size = MockGlobals.Size;

    const {
      "default": MockFile,
    } = await (
      import("../lib/file") as Import<typeof File>
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
      import("../core") as Import<typeof Shortcut>
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
