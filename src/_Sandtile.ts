// icon-color: deep-green; icon-glyph: play-circle;
import Widget from "./app/widget";

await new class Sandtile extends Widget {
  /* eslint-disable @typescript-eslint/require-await */
  protected async runtime() {
    void this.text(null);
  }
}().run();
