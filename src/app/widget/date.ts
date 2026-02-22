import IWidget from "./iwidget";

export default abstract class<
  Setting = never,
  History extends string | Table = never,
> extends IWidget<
  Setting,
  History
> {
  protected preview() {
    void this.widget.presentAccessoryInline();
  }
}
