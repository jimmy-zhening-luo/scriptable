import { should } from "chai";
import type File from ".";

should();
describe("File", function () {
  const file = global._File as typeof File,
  synthetic = new file(
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
