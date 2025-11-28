"cyan comments";
import Shortcut from "./app";
// import Api from "./lib/api";

void new class Chat extends Shortcut {
  protected runtime() {
    const { input = "" } = this;

    console.log(input);
  }
}().run()
