// icon-color: deep-green; icon-glyph: play;
import Shortcut from "./core";

class Sandbox extends Shortcut {
  protected runtime() {
    const foo = null;

    return foo;
  }
}

await new Sandbox().run();
