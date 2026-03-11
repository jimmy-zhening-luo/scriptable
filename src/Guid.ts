"gray fingerprint";
import Shortcut from "./app";

void new class Guid extends Shortcut<
  never,
  string,
  Field<"start">
> {
  protected override ui = (guid: Void<string>) => {
    Pasteboard.copy(guid!);
    this.notify(guid);
  };

  protected runtime() {
    const { input } = this,
    start = input
      ?.start[0]
      ?.toUpperCase();

    let guid = UUID.string();

    if (
      start
      && (
        start >= "0"
        && start <= "9"
        || start >= "A"
        && start <= "F"
      )
    )
      while (!guid.startsWith(start))
        guid = UUID.string();

    return guid.toLowerCase();
  }
}(true)
  .run();
