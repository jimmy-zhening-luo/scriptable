// icon-color: gray; icon-glyph: fingerprint;
import Shortcut from "./core";

class Guid extends Shortcut<
  never,
  string
> {
  protected runtime() {
    const guid = UUID.string().toLocaleLowerCase();

    if (!this.context.production)
      Pasteboard.copy(guid)

    return guid;
  }
}

new Guid().run();
