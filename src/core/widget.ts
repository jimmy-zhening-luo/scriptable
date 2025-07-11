import IApp from "./app";
import Time from "../lib/time";
import Style from "../lib/ui/style";

export default abstract class Widget<
  Setting = never,
> extends IApp<
    string,
    void,
    Setting
  > {
  protected readonly widget = new ListWidget;
  protected readonly style;
  private readonly tap: boolean;

  constructor(
    title: Null<string> = null,
    private readonly showLastRefresh = true,
    private readonly weight = 12,
    spacing = 5,
    {
      top = 12,
      trailing = 12,
      bottom = 12,
      leading = 12,
    } = {},
  ) {
    const tap = config.runsInApp
      && typeof args.widgetParameter === "string";

    super(
      args.widgetParameter as Null<string>
      ?? undefined,
      config.runsInWidget
      || tap,
    );
    this
      .tap = tap;
    this
      .style = new Style(
        this.weight,
      );
    this
      .widget
      .spacing = spacing;
    this
      .widget
      .setPadding(
        top,
        leading,
        bottom,
        trailing,
      );

    if (title !== "")
      this
        .field(
          title
          ?? this.app,
          this
            .style
            .title(),
        );
  }

  protected output() {
    if (this.showLastRefresh)
      this
        .field(
          "Latest: " + new Time()
            .print(
              "h:mm a",
            ),
          this
            .style
            .footnote(),
        );

    this
      .widget
      .refreshAfterDate = new Time()
        .in(
          { seconds: 30 },
        )
        .toDate();
    Script.setWidget(
      this
        .widget,
    );

    if (
      this.tap
      && this.onTap !== undefined
    )
      try {
        this.onTap();
      }
      catch (errorWidgetTap) {
        throw new Error(
          "UI",
          { cause: errorWidgetTap },
        );
      }
  }

  protected override test = () => {
    this
      .widget
      .presentSmall()
      .catch(
        (errorScriptableUI: unknown) => {
          throw new EvalError(
            "Error presenting widget",
            { cause: errorScriptableUI },
          );
        },
      );
  };

  protected line(
    height: number,
  ) {
    return this
      .widget
      .addSpacer(height);
  }

  protected field(
    text: string,
    font: Font = this.style.body(),
  ) {
    const field = this
      .widget
      .addText(text);

    field.font = font;

    return field;
  }

  protected clock(
    {
      ampm = true,
      fontTime = this
        .style
        .fonts
        .rounded
        .regular(
          Math
            .round(
              this.weight * 1.5,
            ),
        ),
      fontLabel = this
        .style
        .fonts
        .rounded
        .bold(
          this.weight,
        ),
      label = "",
      timezone = null,
    }: {
      ampm?: boolean;
      fontTime?: Font;
      fontLabel?: Font;
      label?: string;
      timezone?: (
        | null
        | "America/Los_Angeles"
        | "America/New_York"
        | "Europe/Zurich"
        | "Asia/Shanghai"
        | "Asia/Seoul"
      );
    } = {},
  ) {
    const now = new Time,
    gmtLocal = now.offset(null),
    gmtDest = now.offset(timezone),
    wallZ = now.at(offset),
    am = now.epoch - wallZ.epoch < 43_200_000,
    clock = this
      .widget
      .addStack(),
    dial = clock
      .addDate(
        (
          ampm && !am
            ? wallZ.in(
                { hours: 12 },
              )
            : wallZ
        )
          .toDate(),
      ),
    column1 = clock
      .addSpacer(12),
    complication = clock
      .addText(
        ampm
          ? am
            ? "AM"
            : "PM"
          : "",
      ),
    column2 = clock
      .addSpacer(12),
    annotation = clock
      .addText(label);

    dial
      .applyTimerStyle();
    dial
      .font = fontTime;
    complication
      .font = fontTime;
    annotation
      .font = fontLabel;

    return {
      clock,
      parts: {
        dial,
        column1,
        complication,
        column2,
        annotation,
      },
    } as const;
  }

  protected onTap?: () => void;
}
