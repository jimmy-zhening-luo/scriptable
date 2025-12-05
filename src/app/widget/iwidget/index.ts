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
    protected url?: string,
    protected readonly tapPreview = false,
  ) {
    const input = args.widgetParameter as Null<string>;

    super(input as stringful || null);
    this.widget.refreshAfterDate = new Time()
      .in(0, 1)
      .date();
  }

  protected get tapped() {
    return this.interactive && Boolean(this.input);
  }

  protected override ui = () => {
    if (this.tapped) {
      this.tap?.();

      if (!this.tapPreview)
        return;
    }

    this.preview();
  };

  protected output() {
    if (this.url)
      this.widget.url = this.url;

    Script.setWidget(this.widget);
  }

  protected text(text: unknown) {
    return this.widget.addText(String(text));
  }

  protected abstract preview(): void;
  protected tap?: () => void;
}
