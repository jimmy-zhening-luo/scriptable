// icon-color: teal; icon-glyph: hand-point-up;
import Widget from "./app/widget";

class MyWidget extends Widget {
  protected runtime() {
    this.widget.addText("Testing");
    this.widget.addText(this.input ?? "no input");

    return null;
  }
}

new MyWidget().run();
