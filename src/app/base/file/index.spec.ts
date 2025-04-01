import { should } from "chai";
import File from ".";

should();
describe("File", function () {
  const synthetic = new File(
    "Storage",
    {
      name: "SYNTHETIC_FILENAME.txt",
      folder: "SYNTHETIC_SUBFOLDER",
    },
    true,
  );

  describe("shape", function () {
    it("is a constructor", function () {
      synthetic
        .should.be
        .an("object");
    });
  });
  describe("instance", function () {
    it("is mutable", function () {
      synthetic.mutable
        .should.be
        .a("boolean")
        .true;
    });
  });
});
