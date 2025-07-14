// icon-color: cyan; icon-glyph: calendar-alt;
import Widget from "./core/widget";

class EventBar extends Widget {
  protected runtime() {
    this.line();
  }
}

new EventBar("").run();
