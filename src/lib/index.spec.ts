import { should } from "chai";
import {
  SyntheticFileManager,
  SyntheticNotification,
  syntheticArgs,
} from "../test/synthetics";
import type Shortcut from ".";

should();
global.FileManager = SyntheticFileManager;
global.Notification = SyntheticNotification;
global.args = syntheticArgs;

const { "default": shortcut } = await (import(".") as Promise<Record<"default", typeof Shortcut>>)
  .catch((e: unknown) => {
    throw new EvalError(
      "Mocha: failed to load `shortcut` module",
      { cause: e },
    );
  })
  .finally(() => console.log("Mocha: dynamically loaded `shortcut` module"));

class ConcreteShortcut extends shortcut<string, string> {
  protected override stringInput = true;

  protected runtime() {
    return "CONCRETE_SHORTCUT_OUTPUT";
  }
}

describe("Shortcut", function () {
  describe("shape", function () {
    it("is extensible", function () {
      (new ConcreteShortcut)
        .should.be
        .an("object");
    });
  });
});
