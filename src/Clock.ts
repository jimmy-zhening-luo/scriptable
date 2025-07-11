// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget {
  protected runtime() {
    this.clock();
    this.clock(
      {
        name: "CN"
        timezone: "Asia/Shanghai",
      },
    );
    this.field(
      this.input
      ?? "No input",
    );
  }
}

new Clock().run();
