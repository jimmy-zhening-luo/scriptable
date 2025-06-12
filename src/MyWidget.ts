// icon-color: teal; icon-glyph: hand-point-up;
import Widget from "./core/widget";

class MyWidget extends Widget {
  protected runtime() {
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
