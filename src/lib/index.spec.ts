import { expect } from "chai";
import {
  FakeFileManager,
  FakeNotification,
  fakeArgs,
} from "./object/_fakes/index.spec";

global.FileManager = FakeFileManager;
global.Notification = FakeNotification;
global.args = fakeArgs;

import Shortcut from ".";

class FakeShortcut extends Shortcut<string, string> {
  protected override stringInput = true;

  protected runtime() {
    const fake = "FAKE_OUTPUT";

    return fake;
  }
}

describe("Shortcut", function () {
  describe("shape", function () {
    it("is extensible", function () {
      expect(new FakeShortcut)
        .an("object");
    });
  });
});
