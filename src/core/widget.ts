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
      name = "",
      timezone = null,
    }: {
      ampm?: boolean;
      fontTime?: Font;
      fontLabel?: Font;
      name?: string;
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
    offsetUtcLocal = now
      .offset(
        null,
      ),
    offsetUtcDestination = now
      .offset(
        timezone,
      ),
    offsetDestinationLocal = offsetUtcDestination
      - offsetUtc,
    midnightDestination = now
      .at(
        offsetDestinationLocal,
      ),
    clock = this
      .widget
      .addStack(),
    dial = clock
      .addDate(
        midnightDestination
          .toDate(),
      ),
    column1 = clock
      .addSpacer(
        10,
      ),
    annotation = clock
      .addText(
        name,
      );

    dial
      .applyTimerStyle();
    dial
      .font = fontTime;
    annotation
      .font = fontLabel;

    return {
      clock,
      parts: {
        dial,
        column1,
        annotation,
      },
    } as const;
  }

  protected onTap?: () => void;
}
