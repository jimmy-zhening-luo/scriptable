// icon-color: deep-green; icon-glyph: leaf;
import Shortcut from "./lib";

class _Sandbox extends Shortcut {
  protected runtime() {
    const foo = null;

    return foo;
  }
}

new _Sandbox().run();
