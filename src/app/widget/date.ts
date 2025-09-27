import Widget from ".";

export default abstract class DateWidget<Setting = never> extends Widget<Setting> {
  constructor(url: Null<string> = null) {
    super(
      null,
      url,
      {},
      false,
    );
  }

  protected override development = () => {
    void this.widget.presentAccessoryInline();
  };

  protected override text(text: string) {
    return super.text(
      text,
      null,
    );
  }

  protected override line(): never {
    throw TypeError("DateWidget must be single-line");
  }

  protected override clock(): never {
    throw TypeError("DateWidget has no clock implementation");
  }

  protected override lastRefresh(): never {
    throw TypeError("DateWidget is too small to display refresh time");
  }
}
