// icon-color: deep-green; icon-glyph: play;
import Shortcut from "./app";

await new (class Sandbox extends Shortcut {
  /* eslint-disable @typescript-eslint/require-await */
  protected async runtime() {
    const foo = null;

    return foo;
  }
})().run();
