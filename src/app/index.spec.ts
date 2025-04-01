import { should } from "chai";
import type Shortcut from ".";

should();
const { "default": shortcut } = await (import(".") as Promise<Record<"default", typeof Shortcut>>)
  .catch((e: unknown) => {
    throw new EvalError(
      "Mocha: failed to load `shortcut` module",
      { cause: e },
    );
  })
  .finally(() => console.log("Mocha: shortcut: module loader executed"));

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
