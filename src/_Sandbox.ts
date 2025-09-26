// icon-color: deep-green; icon-glyph: play;
import Shortcut from "./app";

class Sandbox extends Shortcut {
  /* eslint-disable @typescript-eslint/require-await */
  protected async runtime() {
    const foo = null;

    return foo;
  }
}

await new Sandbox().run();
