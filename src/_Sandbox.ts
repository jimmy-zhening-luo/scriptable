// icon-color: deep-green; icon-glyph: play;
import Shortcut from "./core";

class _Sandbox extends Shortcut {
  protected runtime() {
    const foo = null;

    return foo;
  }
}

await new _Sandbox().run();
