// icon-color: yellow; icon-glyph: circle;
import Shortcut from "./app";
import date from "./app/lib/date";

class _Hello extends Shortcut<
  never,
  stringful,
  { readonly space?: string }
> {
  protected runtime() {
    const { setting: { space } } = this,
    path = "salute";

    this.write("Hej", true, path);
    this.write(`World, on ${date()}`);

    return ([
      this.readful(path),
      this.stringful(space, "setting"),
      this.readful(),
    ] as const satisfies Triad<stringful>).join("") as stringful;
  }
}

new _Hello().run();
