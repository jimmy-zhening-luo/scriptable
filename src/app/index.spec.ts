import { should } from "chai";

class ConcreteShortcut extends Shortcut<string, string> {
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
