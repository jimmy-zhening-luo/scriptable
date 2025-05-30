// icon-color: teal; icon-glyph: hand-point-up;
import Widget from "./app/widget";

class MyWidget extends Widget {
  protected runtime() {
    this.widget.addText(this.app);
    this.widget.addText(this.input ?? "No input");

    return null;
  }

  protected action() {
    throw new Error(`Tapped at ${
      this.date({ format: "h:mm a" })
    }`);
  }
}

new MyWidget().run();
