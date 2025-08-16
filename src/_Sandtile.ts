// icon-color: deep-green; icon-glyph: play-circle;
import Widget from "./core/widget";

class Sandtile extends Widget {
  protected async runtime() {
    const foo = await (this.app as unknown as Promise<string>);

    void this.text(foo);
  }
}

await new Sandtile(
  "Sandtile",
  "home",
  {
    background: Color.black(),
  },
).run();
