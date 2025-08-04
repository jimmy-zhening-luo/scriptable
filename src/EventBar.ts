// icon-color: pink; icon-glyph: calendar-alt;
import Widget from "./core/widget";

class EventBar extends Widget {
  protected runtime() {
    this.text(
      new Widget.Time().print("MMM"),
    );
  }
}

new EventBar(null, "calendar").run();
