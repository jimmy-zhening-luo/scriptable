import IWidget from "../iwidget";

export default abstract class DateWidget<Setting = never> extends IWidget<Setting> {
  protected override development = () => {
    void this.widget.presentAccessoryInline();
  };

  protected override line(): never {
    throw TypeError("DateWidget must be single-line");
  }
}
