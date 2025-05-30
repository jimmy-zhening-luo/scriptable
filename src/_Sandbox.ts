// icon-color: deep-green; icon-glyph: leaf;
import Shortcut from "./app";

class _Sandbox extends Shortcut {
  protected runtime() {
    let foo = null;

    return foo;
  }
}

new _Sandbox().run();
