// icon-color: yellow; icon-glyph: circle;
import Shortcut from "./lib";
import date from "./lib/object/date";

class _Hello extends Shortcut<
  never,
  stringful,
  { readonly space?: string }
> {
  protected runtime() {
    const { setting: { space } } = this,
    ini = "salute";

    this.write("Hej", true, ini);
    this.write(`World, on ${date()}`);

    return ([
      this.readful(ini),
      this.stringful(space, "setting"),
      this.readful(),
    ] as const satisfies Triad<stringful>).join("") as stringful;
  }
}

new _Hello().run();
