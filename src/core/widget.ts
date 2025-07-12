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
          {
            seconds: 30,
          },
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

  protected override test = function() {
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
    height: number = this.weight,
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
      timezone = null,
      font = this
        .style
        .fonts
        .rounded
        .regular(
          Math
            .round(
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
      .ago(
        {
          hours: difference,
        },
      ),
    sinceMidnightDestination = now
      .since(
        midnightDestination,
      ),
    midnightDestinationNormal = sinceMidnightDestination < 0
      ? midnightDestination
          .ago(
            {
              hours: 24,
            },
          )
      : sinceMidnightDestination >= 86400000
        ? midnightDestination
            .in(
              {
                hours: 24,
              },
            )
        : midnightDestination,
    sinceMidnightDestinationNormal = now
      .since(
        midnightDestinationNormal,
      ),
    {
      zero,
      show,
    } = ampm
      ? sinceMidnightDestinationNormal < 43200000
        ? {
            zero: sinceMidnightDestinationNormal < 3600000
              ? midnightDestinationNormal
                  .ago(
                    {
                      hours: 12,
                    },
                  )
              : midnightDestinationNormal,
            show: "AM",
          }
        : {
            zero: sinceMidnightDestinationNormal < 46800000
              ? midnightDestinationNormal
              : midnightDestinationNormal
                  .in(
                    {
                      hours: 12,
                    },
                  ),
            show: "PM",
          }
      : {
          zero: midnightDestinationNormal,
          show: "",
        },
    clock = this
      .widget
      .addStack();

    clock.centerAlignContent();

    const dial = clock
      .addDate(
        zero
          .toDate(),
      ),
    column = clock
      .addSpacer(
        this.weight,
      ),
    complication = clock
      .addText(
        show,
      );

    dial
      .applyTimerStyle();
    dial
      .font = font;
    complication
      .font = font;

    return {
      clock,
      parts: {
        dial,
        column,
        complication,
      },
    } as const;
  }

  protected onTap?: () => void;
}
