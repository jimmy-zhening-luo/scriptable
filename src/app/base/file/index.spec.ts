import "chai/register-should.js";

describe("File", function () {
  describe("shape", function () {
    it("is a constructor", function () {
      mockFile
        .should.be
        .an("object");
    });
  });
  describe("instance", function () {
    it("is mutable", function () {
      mockFile
        .mutable
        .should.be
        .a("boolean")
        .true;
    });
  });
});
