// icon-color: deep-green; icon-glyph: play-circle;
import Widget from "./app/widget";

class Sandtile extends Widget {
  /* eslint-disable @typescript-eslint/require-await */
  protected async runtime() {
    const foo = this.app;

    void this.text(foo);
  }
}

await new Sandtile("Sandtile").run();
