// icon-color: deep-green; icon-glyph: play;
import Shortcut from "./app";

class _Sandbox extends Shortcut {
  protected runtime() {
    const foo = null;

    return foo;
  }
}

new _Sandbox().run();
