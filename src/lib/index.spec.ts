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

class ConcreteShortcut extends Shortcut<string, string> {
  protected override stringInput = true;

  protected runtime() {
    return "CONCRETE_SHORTCUT_OUTPUT";
  }
}

describe("Shortcut", function () {
  describe("shape", function () {
    it("is extensible", function () {
      expect(new ConcreteShortcut)
        .an("object");
    });
  });
});
