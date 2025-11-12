import IApp from "../../../core";
import Time from "../../../lib/time";
import location from "../../../lib/location";

export default abstract class<Setting> extends IApp<
  Setting,
  void,
  string
> {
  public static readonly Time = Time;
  public static readonly location = location;
  protected readonly production = config.runsInWidget;
  protected readonly widget = new ListWidget;

  constructor(
    protected url = "",
    protected readonly tapPreview = false,
  ) {
    const input = args.widgetParameter as Null<string>;

    super(
      input === ""
        ? null
        : input as stringful,
    );
    this.widget.refreshAfterDate = new Time()
      .in(0, 1)
      .date();
  }

  protected get tapped() {
    return this.interactive && this.input !== undefined;
  }

  protected override ui = () => {
    if (this.tapped) {
      if (this.tap !== undefined)
        this.tap();

      if (this.tapPreview)
        this.preview();
    }
    else
      this.preview();
  };

  protected output() {
    if (this.url !== "")
      this.widget.url = this.url;

    Script.setWidget(this.widget);
  }

  protected text(text: unknown) {
    return this.widget.addText(String(text));
  }

  protected abstract preview(): void;
  protected tap?: () => void;
}
