"cyan comments";
import Shortcut from "./app";
// import Api from "./lib/api";

await new class Chat extends Shortcut {
  protected runtime() {
    const { input } = this;

    return input;
  }
}().run()
