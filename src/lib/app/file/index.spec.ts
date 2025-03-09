import { expect } from "chai";
import { SyntheticFileManager } from "./index.synthetic.spec";
import type File from ".";

global.FileManager = SyntheticFileManager;

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

const storage = new file("SYNTHETIC_BOOKMARK_FILETYPE_STORAGE", true, { name: "SYNTHETIC_FILENAME.txt", folder: "SYNTHETIC_SUBFOLDER" });

describe("File", function () {
  describe("shape", function () {
    it("is a constructor", function () {
      expect(storage)
        .an("object");
    });
  });
});
