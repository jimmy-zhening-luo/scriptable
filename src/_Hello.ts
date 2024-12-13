// icon-color: yellow; icon-glyph: circle;
import Shortcut from "./lib";
import date from "./lib/object/date";

class _Hello extends Shortcut<
  never,
  string,
  { space?: string }
> {
  protected runtime() {
    const SALUTATION = "Hej",
    salute = "salute";

    if (this.read(salute) !== SALUTATION)
      this.write(SALUTATION, true, salute);

    const greeting = `${this.read(salute)}${_Hello.stringful(this.setting.space, "setting")}${this.read()}`;

    this.write(`World from ${date()}`);

    return greeting;
  }
}

new _Hello().run();
