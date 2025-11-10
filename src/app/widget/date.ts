import IWidget from "./iwidget";

export default abstract class<Setting = never> extends IWidget<Setting> {
  protected override ui = () => {
    void this.widget.presentAccessoryInline();
  };
}
