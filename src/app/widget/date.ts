import Widget from ".";

export default abstract class DateWidget<Setting = never> extends Widget<Setting> {
  constructor(url: Null<string> = null) {
    super(
      null,
      false,
      { url },
    );
  }

  protected override development = () => {
    void this.widget.presentAccessoryInline();
  };

  protected override line(): never {
    throw TypeError("Calendar Widget must be single-line");
  }

  protected override lastRefresh(): never {
    throw TypeError("DateWidget cannot fit last refresh time");
  }
}
