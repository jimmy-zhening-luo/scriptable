"gray fingerprint";
import Shortcut from "./app";

void new class Guid extends Shortcut<never, string> {
  protected runtime() {
    const guid = UUID.string().toLocaleLowerCase();

    if (!this.context.production)
      Pasteboard.copy(guid);

    return guid;
  }
}().run();
