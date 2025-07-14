// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget {
  protected runtime() {
    this.clock();
    this.line(5);
    this.text("China");
    this.clock(
      {
        timezone: "Asia/Shanghai",
      },
    );
    this.line();
    this.text(
      "Sunset: " + this.feed("sunset"),
    );
  }
}

new Clock().run();
