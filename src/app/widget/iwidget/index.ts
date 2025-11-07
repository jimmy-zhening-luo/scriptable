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
  private readonly tapped;

  constructor(url: Null<string> = null) {
    const input = args.widgetParameter as Null<string>,
    tapped = config.runsInApp
      && typeof input === "string";

    super(
      input,
      config.runsInWidget || tapped,
    );
    this.tapped = tapped;
    this.url = url;
    this.widget.refreshAfterDate = new Time()
      .in(0, 1)
      .date();
  }

  protected get url() {
    return this.widget.url as Null<string>;
  }

  protected set url(url: Null<string>) {
    if (url !== null && url !== "")
      this.widget.url = url;
  }

  protected output() {
    if (this.tapped && this.onTap !== undefined)
      this.onTap();

    Script.setWidget(this.widget);
  }

  protected text(text: unknown) {
    return this.widget.addText(String(text));
  }

  protected onTap?: () => void;
}
