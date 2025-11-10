"gray fingerprint";
import Shortcut from "./app";

void new class Guid extends Shortcut<never, string> {
  protected override ui = (guid: Void<string>) => {
    if (guid !== undefined)
      Pasteboard.copy(guid);
  };

  protected runtime() {
    return UUID.string().toLocaleLowerCase();
  }
}().run();
