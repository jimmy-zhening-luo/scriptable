import { expect } from "chai";
import { FakeFileManager } from "../object/fake/index.spec";

global.FileManager = FakeFileManager;

import file from "./file";

const storage = new file("FakeStorage", true, { name: "FAKE_FILE.txt", folder: "FAKE/SUB/DIRECTORY" });

describe("File", function () {
  describe("shape", function () {
    it("is a constructor", function () {
      expect(storage)
        .an("object");
    });
  });
});
