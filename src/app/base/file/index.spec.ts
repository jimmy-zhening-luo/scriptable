import { should } from "chai";
import type File from ".";

should();

describe("File", async function () {
  const { "default": file } = await (import(".") as Promise<Record<"default", typeof File>>)
    .catch((e: unknown) => {
      throw new EvalError(
        "Mocha: failed to load `file` module",
        { cause: e },
      );
    })
    .finally(() => console.log("Mocha: file: module loader executed")),
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
