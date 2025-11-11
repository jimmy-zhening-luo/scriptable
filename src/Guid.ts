"gray fingerprint";
import Shortcut from "./app";

void new class Guid extends Shortcut<never, string> {
  protected override ui = (guid: Void<string>) => {
    Pasteboard.copy(guid!);
    this.notify(guid);
  };

  protected runtime() {
    return UUID.string().toLocaleLowerCase();
  }
}().run();
