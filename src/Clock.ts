// icon-color: orange; icon-glyph: clock;
import Widget from "./core/widget";

class Clock extends Widget {
  protected runtime() {
    this.clock();
    this.clock(
      {
        timezone: "Asia/Shanghai",
      },
    );
    this.field(
      this.input
      ?? "No input",
    );
  }

  protected action(): void {
    return undefined;
  }
}

new Clock().run();
