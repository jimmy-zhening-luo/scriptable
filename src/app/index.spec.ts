import * as chai from "chai";

chai.should();
describe("Shortcut", function () {
  describe("shape", function () {
    it("is extensible", function () {
      (new MockConcreteShortcut)
        .should.be
        .an("object");
    });
  });
});
