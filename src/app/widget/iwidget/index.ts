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
  protected readonly widget = new ListWidget;
  protected readonly tapped = this.interactive
    && args.widgetParameter !== null;
  protected readonly production = config.runsInWidget
    || this.tapped;
  protected override suppress = true;

  constructor(protected url = "") {
    super(args.widgetParameter as Null<string>);
    this.widget.refreshAfterDate = new Time()
      .in(0, 1)
      .date();

    if (url !== "")
      this.widget.url = url;
  }

  protected output() {
    if (this.tapped && this.tap !== undefined)
      this.tap();

    if (this.url !== "")
      this.widget.url = this.url;

    Script.setWidget(this.widget);
  }

  protected text(text: unknown) {
    return this.widget.addText(String(text));
  }

  protected tap?: () => void;
}
