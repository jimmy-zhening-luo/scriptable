// icon-color: gray; icon-glyph: fingerprint;
import Shortcut from "./core";

class Guid extends Shortcut<
  never,
  string
> {
  protected runtime() {
    return UUID.string().toLocaleLowerCase();
  }
}

new Guid().run();
