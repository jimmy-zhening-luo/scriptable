import * as Mock from "./globals";
import type File from "../lib/file";
import type Shortcut from "../core";

type Import<Module> = Promise<
  Record<
    "default",
    Module
  >
>;

export async function mochaGlobalSetup() {
  try {
    console.log("Mocha hooks: BEGIN");
    global.args = Mock.args;
    global.config = Mock.config;
    global.Data = Mock.Data;
    global.DateFormatter = Mock.DateFormatter;
    global.FileManager = Mock.FileManager;
    global.Image = Mock.Image;
    global.Notification = Mock.Notification;
    global.Size = Mock.Size;

    const {
      "default": FileModule,
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

    global.ambientFile = new FileModule(
      "Storage",
      "SYNTHETIC_FILENAME.txt",
      "SYNTHETIC_SUBFOLDER",
    );

    const {
      "default": ShortcutModule,
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

    global.ConcreteShortcut = class ConcreteShortcut extends ShortcutModule<
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
