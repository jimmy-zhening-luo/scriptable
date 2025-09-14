import Widget from ".";

export default abstract class DateWidget<
  Setting = never,
> extends Widget<Setting> {
  protected readonly widget = new ListWidget;
  protected readonly style;
  private readonly weight;
  private readonly tapped;

  constructor(
    title: Null<string> = null,
    url: Null<string>,
  ) {
    super(
      title,
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
