const IApp = require("../core");

import Time from "../../lib/time";
import location from "../../lib/location";
import Style from "../../lib/ui/typography";

const DEFAULT_FACTOR = 12;

export default abstract class Widget<Setting = never> extends IApp<
  string,
  void,
  Setting
> {
  public static readonly Time = Time;
  public static readonly location = location;
  protected readonly widget = new ListWidget;
  protected readonly style;
  private readonly weight;
  private readonly tapped;

  constructor(
    title: Null<string> = null,
    private readonly home = true,
    {
      background = Color.black(),
      url = null,
    }: {
      background?: Color;
      url?: Null<string>;
    } = {},
    {
      weight = DEFAULT_FACTOR,
      spacing = Math.round(weight / 4),
      top = DEFAULT_FACTOR,
      trailing = DEFAULT_FACTOR,
      bottom = DEFAULT_FACTOR,
      leading = DEFAULT_FACTOR,
    } = {},
  ) {
    const input = args.widgetParameter as Null<string>,
    tapped = config.runsInApp
      && typeof input === "string";

    super(
      input,
      config.runsInWidget || tapped,
    );
    this.tapped = tapped;
    this.url = url;
    this.weight = Math.round(weight);
    this.style = new Style(this.weight);
    this.widget.backgroundColor = background;

    if (home) {
      this.widget.spacing = spacing;
      this.widget.setPadding(
        top,
        leading,
        bottom,
        trailing,
      );

      if (title !== "") {
        void this.text(
          title ?? this.app,
          this.style.title(),
        );
        void this.line(Math.round(weight / 6));
      }
    }
  }

  protected get url() {
    return this.widget.url as Null<string>;
  }

  protected set url(url: Null<string>) {
    this.widget.url = url!;
  }

  protected output() {
    this.widget.refreshAfterDate = new Time()
      .in(0, 1)
      .toDate();

    Script.setWidget(this.widget);

    if (this.tapped && this.onTap !== undefined)
      try {
        this.onTap();
      }
      catch (runtimeActionError) {
        throw new Error(
          "UI",
          { cause: runtimeActionError },
        );
      }
  }

  protected override development = () => {
    void this.widget[
      `present${
        this.home
          ? "Small" as const
          : "AccessoryCircular" as const
      }`
    ]();
  };

  protected line(height = 0) {
    return this.widget.addSpacer(height);
  }

  protected text(
    text: string,
    font = this.style.body(),
  ) {
    const textbox = this.widget.addText(text);

    textbox.font = font;

    return textbox;
  }

  protected clock(
    timezone: Parameters<typeof Time.prototype.offset>[0] = null,
    label = "--",
    ampm = true,
  ) {
    const now = new Time,
    destinationMidnight = now
      .midnight
      .in(now.offset(timezone)),
    destinationZero = destinationMidnight.in(
      now < destinationMidnight
        ? -24
        : now > destinationMidnight.in(24)
          ? 24
          : 0,
    ),
    { zero, period = "" } = ampm
      ? now < destinationZero.in(12)
        ? {
            zero: destinationZero.ago(
              now < destinationZero.in(1)
                ? 12
                : 0,
            ),
            period: "AM",
          }
        : {
            zero: destinationZero.in(
              now < destinationZero.in(13)
                ? 0
                : 12,
            ),
            period: "PM",
          }
      : { zero: destinationZero },
    clock = this.widget.addStack();

    clock.spacing = 0;
    clock.centerAlignContent();
    clock.addText(label).font = new Font(
      "Consolas",
      Math.round(this.weight * 1.1),
    );
    void clock.addSpacer(
      Math.round(this.weight * 1.25),
    );

    const dial = clock.addDate(zero.toDate());

    dial.font = this
      .style
      .round
      .regular(
        Math.round(this.weight * 1.5),
      );
    dial.applyTimerStyle();
    clock.addText(period).font = this
      .style
      .round
      .semibold(
        Math.round(this.weight * 1.2),
      );
    void clock.addSpacer(
      Math.round(this.weight * 1.75),
    );
  }

  protected lastRefresh(
    label = "Latest: ",
    font = this.style.footnote(),
  ) {
    if (!this.home)
      throw new TypeError("Last refresh date can only be shown on Home Screen Widget");

    return this.text(
      label.concat(
        new Time().print("h:mm a"),
      ),
      font,
    );
  }

  protected onTap?: () => void;
}
