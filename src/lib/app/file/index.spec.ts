import { expect } from "chai";
import { SyntheticFileManager } from "./index.synthetic.spec";
import type File from ".";

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
  const myFile = new file("Storage", true, { name: "SYNTHETIC_FILENAME.txt", folder: "SYNTHETIC_SUBFOLDER" });

  describe("shape", function () {
    it("is a constructor", function () {
      expect(myFile)
        .an("object");
    });
  });
  describe("instance", function () {
    it("is mutable", function () {
      expect(myFile.mutable).a("boolean").true;
    });
  });
});
