import * as Mock from "./globals";
import type Shortcut from "../app";

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

    const ShortcutModule = await (import("../app") as Promise<typeof Shortcut>)
      .catch(
        (e: unknown) => {
          throw ReferenceError(
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
    throw EvalError(
      "Mocha hooks: FAILED",
      { cause: error },
    );
  }
}
