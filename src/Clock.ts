// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget {
  protected runtime() {
    this.clock();
    this.line();
    this.field("China");
    this.clock(
      {
        timezone: "Asia/Shanghai",
      },
    );
  }
}

new Clock().run();
