// icon-color: deep-purple; icon-glyph: layer-group;
import Shortcut from "./lib";

class WidgetTest extends Shortcut {
  protected runtime() {
    console.log("Hello placeholder");

    return null;
  }
}

new WidgetTest().run();
