// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget {
  protected runtime() {
    this.clock();
    this.line(5);
    this.field("China");
    this.clock(
      {
        timezone: "Asia/Shanghai",
      },
    );
    this.line();
    this.field(
      "Sunset: " + this.feed("sunset.txt"),
    );
  }
}

new Clock(
  null,
  false,
).run();
