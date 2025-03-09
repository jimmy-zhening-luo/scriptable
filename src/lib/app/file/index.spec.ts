import { expect } from "chai";
import { FakeFileManager } from "../../object/_fakes/index.spec";
import type File from ".";

global.FileManager = FakeFileManager;

const { "default": file } = await (
  import(".") as Promise<Record<"default", typeof File>>
)
  .catch((e: unknown) => {
    throw new EvalError(
      `Mocha: Failed to dynamically load \`file\` from \`file.js\``,
      { cause: e },
    );
  })
  .finally(() => console.log("`File` module successfully loaded from `file.js`"));

console.log(`typeof file: ${typeof file}`);

const storage = new file("FakeStorage", true, { name: "FAKE_FILE.txt", folder: "FAKE/SUB/DIRECTORY" });

describe("File", function () {
  describe("shape", function () {
    it("is a constructor", function () {
      expect(storage)
        .an("object");
    });
  });
});
