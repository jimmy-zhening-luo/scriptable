import { expect } from "chai";
import {
  SyntheticFileManager,
  SyntheticNotification,
  syntheticArgs,
} from "./index.synthetic.spec";

global.FileManager = SyntheticFileManager;
global.Notification = SyntheticNotification;
global.args = syntheticArgs;

import Shortcut from ".";

class FakeShortcut extends Shortcut<string, string> {
  protected override stringInput = true;

  protected runtime() {
    const fake = "SYNTHETIC_SHORTCUT_OUTPUT";

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
