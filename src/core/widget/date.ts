import Widget from ".";

export default abstract class DateWidget<
  Setting = never,
> extends Widget<Setting> {
  constructor(
    title: Null<string> = null,
    url: Null<string>,
  ) {
    super(
      title,
      "calendar",
      { url },
    );
  }

  protected override development = () => {
    void this.widget.presentInline();
  };

  protected override line(): never {
    throw new TypeError("Calendar Widget must be single-line");
  }

  protected override lastRefresh(): never {
    throw new TypeError("DateWidget cannot fit last refresh time");
  }
}
