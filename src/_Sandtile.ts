// icon-color: deep-green; icon-glyph: play-circle;
import Widget from "./core/widget";

class Sandtile extends Widget {
  protected async runtime() {
    const foo = null as unknown as Promise<null>,
    bar = await foo;

    void this.text(bar as unknown as string);
  }
}

await new Sandtile(
  "Sandtile",
  "home",
  {
    background: Color.black(),
  },
).run();
