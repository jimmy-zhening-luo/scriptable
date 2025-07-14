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
  private readonly tapped: boolean;

  constructor(
    title: Null<string> = null,
    private readonly mode:
      | "calendar"
      | "lock"
      | "home" = "home",
    weight = 12,
    spacing = 5,
    {
      top = 12,
      trailing = 12,
      bottom = 12,
      leading = 12,
    } = {},
  ) {
    const input = args
      .widgetParameter as Null<string>,
    tapped = config
      .runsInApp
      && typeof input === "string";

    super(
      input,
      config
        .runsInWidget
        || tapped,
    );
    this.tapped = tapped;
    this.style = new Style(
      weight,
    );

    if (mode === "home") {
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
          .text(
            title ?? this.app,
            this.style.title(),
          );
    }
  }

  protected output() {
    this
      .widget
      .refreshAfterDate = new Time()
        .in({
          seconds: 30,
        })
        .toDate();

    if (this.mode !== "home")
      this
        .widget
        .useDefaultPadding();

    Script
      .setWidget(
        this
          .widget,
      );

    if (
      this.tapped
      && this.onTap !== undefined
    )
      try {
        this
          .onTap();
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
    height = this.weight,
  ) {
    return this
      .widget
      .addSpacer(
        height,
      );
  }

  protected text(
    text: string,
    font = this.style.body(),
  ) {
    const text = this
      .widget
      .addText(
        text,
      );

    text.font = font;

    return text;
  }

  protected clock(
    {
      ampm = true,
      timezone = null,
      font = this
        .style
        .fonts
        .rounded
        .regular(
          Math.round(
            this.weight * 1.5,
          ),
        ),
    }: {
      ampm?: boolean;
      timezone?: (
        | null
        | "America/Los_Angeles"
        | "America/New_York"
        | "Europe/Zurich"
        | "Asia/Shanghai"
        | "Asia/Seoul"
      );
      font?: Font;
    } = {},
  ) {
    const now = new Time,
    offsetUTC = now
      .offset(),
    offsetUTCDestination = now
      .offset(
        timezone,
      ),
    difference = offsetUTCDestination
      - offsetUTC,
    midnight = now
      .at(
        0,
      ),
    midnightDestination = midnight
      .ago({
        hours: difference,
      }),
    sinceMidnightDestination = now
      .since(
        midnightDestination,
      ),
    midnightDestinationNormal = sinceMidnightDestination < 0
      ? midnightDestination
          .ago({
            hours: 24,
          })
      : sinceMidnightDestination >= 86400000
        ? midnightDestination
            .in({
              hours: 24,
            })
        : midnightDestination,
    sinceMidnightDestinationNormal = now
      .since(
        midnightDestinationNormal,
      ),
    {
      zero,
      period,
    } = ampm
      ? sinceMidnightDestinationNormal < 43200000
        ? {
            zero: sinceMidnightDestinationNormal < 3600000
              ? midnightDestinationNormal
                  .ago({
                    hours: 12,
                  })
              : midnightDestinationNormal,
            period: "AM",
          }
        : {
            zero: sinceMidnightDestinationNormal < 46800000
              ? midnightDestinationNormal
              : midnightDestinationNormal
                  .in({
                    hours: 12,
                  }),
            period: "PM",
          }
      : {
          zero: midnightDestinationNormal,
          period: "",
        },
    clock = this
      .widget
      .addStack();

    clock.spacing = 0;
    clock.centerAlignContent();

    const dial = clock
      .addDate(
        zero
          .toDate(),
      );

    dial.font = font;
    dial.rightAlignText();
    dial.applyTimerStyle();
    clock
      .addSpacer();

    const complication = clock
      .addText(
        period,
      );

    complication.font = font;

    const trailer = clock
      .addSpacer(
        42,
      );

    return {
      clock,
      parts: {
        dial,
        complication,
        trailer,
      },
    } as const;
  }

  protected lastRefresh(
    label = "Latest: ",
    font = this.style.footnote(),
  ) {
    return this
      .text(
        label + new Time()
          .print(
            "h:mm a",
          ),
        font,
      );
  }

  protected onTap?: () => void;
}
