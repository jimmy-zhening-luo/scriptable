import { should } from "chai";
import { SyntheticFileManager } from "./index.synthetic.spec";
import type File from ".";

should();
global.FileManager = SyntheticFileManager;

const { "default": file } = await (
  import(".") as Promise<Record<"default", typeof File>>
)
  .catch((e: unknown) => {
    throw new EvalError(
      "Mocha: failed to load `file` module",
      { cause: e },
    );
  })
  .finally(() => console.log("Mocha: dynamically loaded `file` module"));

describe("File", function () {
  const myFile = new file("Storage", { name: "SYNTHETIC_FILENAME.txt", folder: "SYNTHETIC_SUBFOLDER" }, true);

  describe("shape", function () {
    it("is a constructor", function () {
      myFile
        .should.be.an("object");
    });
  });
  describe("instance", function () {
    it("is mutable", function () {
      myFile.mutable
        .should.be.a("boolean")
        .true;
    });
  });
});
