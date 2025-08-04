// icon-color: teal; icon-glyph: info-circle;
import Widget from "./core/widget";

class Dashboard extends Widget {
  protected runtime() {
    this.text("Hello, Dashboard.");
  }
}

new Dashboard().run();
