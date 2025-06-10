// icon-color: teal; icon-glyph: hand-point-up;
import Widget from "./app/widget";

class MyWidget extends Widget {
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

new MyWidget().run();
