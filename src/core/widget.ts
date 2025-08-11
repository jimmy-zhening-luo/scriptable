import IApp from "./app";
import Time from "../lib/time";
import Style from "../lib/ui/typography";

const DEFAULT_FACTOR = 12;

export default abstract class Widget<Setting = never> extends IApp<
  string,
  void,
  Setting
> {
  public static readonly Time = Time;
  protected readonly widget = new ListWidget;
  protected readonly style;
  private readonly weight;
  private readonly tapped;

  constructor(
    title: Null<string> = null,
    private readonly mode:
      | "calendar"
      | "lock"
      | "home"
    = "home",
    {
      background = null,
      url = null,
    }: {
      background?: Null<string | Color>;
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
    this.weight = Math.round(weight);
    this.style = new Style(this.weight);
    this.url = url;

    if (mode !== "calendar") {
      if (background !== null)
        this.widget.backgroundColor = typeof background === "string"
          ? new Color(background)
          : background;

      if (mode === "home") {
        this.widget.spacing = spacing;
        this.widget.setPadding(
          top,
          leading,
          bottom,
          trailing,
        );

        if (title !== "") {
          this.text(
            title ?? this.app,
            this.style.title(),
          );
          this.line(Math.round(weight / 6));
        }
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
    this
      .widget[
        this.mode === "calendar"
          ? "presentAccessoryInline"
          : this.mode === "lock"
            ? "presentAccessoryCircular"
            : "presentSmall"
      ]()
      .catch(
        (developmentError: unknown) => {
          throw new EvalError(
            "Error presenting widget",
            { cause: developmentError },
          );
        },
      );
  };

  protected line(height = 0) {
    if (this.mode === "calendar")
      throw new TypeError("Calendar Widget must be single-line");

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

  protected async location(
    accuracy:
      | 0
      | 0.01
      | 0.1
      | 1
      | 3 = 0.1,
  ) {
    const LocationAccuracy = {
      0: "Best",
      0.01: "TenMeters",
      0.1: "HundredMeters",
      1: "Kilometer",
      3: "ThreeKilometers",
    } as const;

    if (accuracy !== 0)
      Location[
        `setAccuracyTo${LocationAccuracy[accuracy]}`
      ]();

    return Location.current();
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
      "Menlo",
      this.weight,
    );
    clock.addSpacer(this.weight * 2);

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
      .regular(
        Math.round(this.weight * 1.2),
      );
    clock.addSpacer(this.weight);
  }

  protected lastRefresh(
    label = "Latest: ",
    font = this.style.footnote(),
  ) {
    if (this.mode !== "home")
      throw new TypeError("Last refresh date can only be shown on Home Screen Widget");

    return this.text(
      label + new Time().print("h:mm a"),
      font,
    );
  }

  protected onTap?: () => void;
}
