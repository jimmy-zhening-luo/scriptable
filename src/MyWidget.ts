// icon-color: teal; icon-glyph: hand-point-up;
import Widget from "./app/widget";

class MyWidget extends Widget {
  protected runtime() {
    return null;
  }
}

new MyWidget().run();
