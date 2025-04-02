import { should } from "chai";

should();
describe("Shortcut", function () {
  describe("shape", function () {
    it("is extensible", function () {
      (new MockConcreteShortcut)
        .should.be
        .an("object");
    });
  });
});
