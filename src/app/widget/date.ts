import IWidget from "./iwidget";

export default abstract class<Setting = never> extends IWidget<Setting> {
  protected preview() {
    void this.widget.presentAccessoryInline();
  };
}
