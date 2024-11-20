// icon-color: yellow; icon-glyph: circle;
import Shortcut from "./lib";
import date from "./lib/object/date";

class _Hello extends Shortcut<
  never,
  string,
  Field<never, "space">
> {
  protected runtime() {
    const greeting = `${this.read("hi")}${_Hello.stringful(this.setting.space, "setting")}${this.read()}`;

    this.write(`World from ${date()}`);

    return greeting;
  }
}

new _Hello().run();
