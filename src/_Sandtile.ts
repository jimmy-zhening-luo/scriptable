"deep-green play-circle";
import Widget from "./app/widget";
const Time = Widget.Time;

await new class Sandtile extends Widget {
  protected async runtime() {
    //
  }
}(null, (new Time).time()).run();
