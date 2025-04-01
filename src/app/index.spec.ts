import { should } from "chai";
import type Shortcut from ".";

const shortcut = _Shortcut as typeof Shortcut;

class ConcreteShortcut extends shortcut<string, string> {
  protected override stringInput = true;

  protected runtime() {
    return "CONCRETE_SHORTCUT_OUTPUT";
  }
}

should();
describe("Shortcut", function () {
  describe("shape", function () {
    it("is extensible", function () {
      (new ConcreteShortcut)
        .should.be
        .an("object");
    });
  });
});
