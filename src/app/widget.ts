import IApp from "./proto";
import Time from "../lib/time";

type WidgetFont = (
  | keyof typeof Widget["Style"]
  | Font
);

export default abstract class Widget<
  Setting = never,
> extends IApp<
    string,
    void,
    Setting
  > {
  protected static readonly Time = Time;
  protected static readonly FONT_WEIGHT = 12;
  protected static readonly Fonts = {
    italic(size = Widget.FONT_WEIGHT) {
      return Font.italicSystemFont(size);
    },
    bold(size = Widget.FONT_WEIGHT) {
      return Font.boldSystemFont(size);
    },
    semibold(size = Widget.FONT_WEIGHT) {
      return Font.semiboldSystemFont(size);
    },
    medium(size = Widget.FONT_WEIGHT) {
      return Font.mediumSystemFont(size);
    },
    light(size = Widget.FONT_WEIGHT) {
      return Font.lightSystemFont(size);
    },
    thin(size = Widget.FONT_WEIGHT) {
      return Font.thinSystemFont(size);
    },
    Rounded: {
      regular(size = Widget.FONT_WEIGHT) {
        return Font.regularRoundedSystemFont(size);
      },
      bold(size = Widget.FONT_WEIGHT) {
        return Font.boldRoundedSystemFont(size);
      },
      semibold(size = Widget.FONT_WEIGHT) {
        return Font.semiboldRoundedSystemFont(size);
      },
      medium(size = Widget.FONT_WEIGHT) {
        return Font.mediumRoundedSystemFont(size);
      },
      light(size = Widget.FONT_WEIGHT) {
        return Font.lightRoundedSystemFont(size);
      },
      thin(size = Widget.FONT_WEIGHT) {
        return Font.thinRoundedSystemFont(size);
      },
    },
    Mono: {
      regular(size = Widget.FONT_WEIGHT) {
        return Font.regularMonospacedSystemFont(size);
      },
      bold(size = Widget.FONT_WEIGHT) {
        return Font.boldMonospacedSystemFont(size);
      },
      semibold(size = Widget.FONT_WEIGHT) {
        return Font.semiboldMonospacedSystemFont(size);
      },
      medium(size = Widget.FONT_WEIGHT) {
        return Font.mediumMonospacedSystemFont(size);
      },
      light(size = Widget.FONT_WEIGHT) {
        return Font.lightMonospacedSystemFont(size);
      },
      thin(size = Widget.FONT_WEIGHT) {
        return Font.thinMonospacedSystemFont(size);
      },
    },
  } as const;
  protected static readonly Style = {
    title: Widget.Fonts
      .semibold(24),
    heading: Widget.Fonts
      .semibold(20),
    subheading: Widget.Fonts
      .semibold(16),
    body: Widget.Font(),
    italic: Widget.Fonts
      .italic(),
    bold: Widget.Fonts
      .bold(),
    semibold: Widget.Fonts
      .semibold(),
    mono: Widget.Fonts
      .Mono
      .regular(),
    footnote: Widget.Fonts
      .light(10),
    clock: Widget.Fonts
      .Rounded
      .regular(14),
    label: Widget.Fonts
      .Rounded
      .bold(12),
  } as const;
  protected readonly widget = new ListWidget;
  private readonly tapped: boolean;

  constructor(
    title: Null<string> = null,
    private readonly showLastRefresh = true,
    spacing = 2,
    {
      top = 2,
      right = 2,
      bottom = 2,
      left = 2,
    } = {},
  ) {
    function size(size: number) z{
      return Number.isInteger(size)
        && size > 0
        ? size
        : 0;
    }

    const tapped = config.runsInApp
      && typeof args.widgetParameter === "string";

    super(
      args.widgetParameter as Null<string>
      ?? undefined,
      config.runsInWidget
      || config.runsInAccessoryWidget
      || tapped,
    );
    this
      .tapped = tapped;
    this
      .widget
      .spacing = size(spacing);
    this
      .widget
      .setPadding(
        size(top),
        size(left),
        size(bottom),
        size(right),
      );

    if (title !== "")
      this.addText(
        title
        ?? this.app,
        "title",
      );
  }

  protected static readonly Font(
    size = Widget.FONT_WEIGHT,
  ) {
    return Font.systemFont(size);
  }

  protected static readonly getFont(
    font: WidgetFont,
  ) {
    return typeof font === "string"
      ? Widget.Style[font]
      : font;
  }

  protected output() {
    if (this.showLastRefresh)
      this.addText(
        "Latest: " + new Time()
          .print(
            "h:mm a",
          ),
        Widget.Style.footnote,
      );

    this.widget.refreshAfterDate = new Time()
      .in(
        {
          seconds: 30,
        },
      )
      .toDate();
    Script.setWidget(this.widget);

    if (this.tapped)
      try {
        this.action();
      }
      catch (errorWidgetAction) {
        throw new Error(
          "UI",
          { cause: errorWidgetAction },
        );
      }
  }

  protected local() {
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
  }

  protected line(
    height: number,
  ) {
    return this
      .widget
      .addSpacer(height);
  }

  protected field(
    text: string,
    font: WidgetFont = "body",
  ) {
    const field = this
      .widget
      .addText(text);

    field.font = Widget.getFont(font);

    return field;
  }

  protected clock(
    {
      ampm = true,
      fontTime = Widget.Style.clock,
      fontLabel = Widget.Style.label,
      label = "",
      timezone = null,
    }: {
      ampm?: boolean;
      fontTime?: WidgetFont;
      fontLabel?: WidgetFont;
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
    offset = timezone === null
      ? 0
      : now.offset(timezone),
    wallZ = now
      .midnight
      .in(
        { hours: offset },
      ),
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
      .addSpacer(5),
    complication = clock
      .addText(
        ampm
          ? am
            ? "AM"
            : "PM"
          : "",
      ),
    column2 = clock
      .addSpacer(5),
    annotation = clock
      .addText(label);

    dial
      .applyTimerStyle();
    dial
      .font = Widget.getFont(fontTime);
    complication
      .font = Widget.getFont(fontTime);
    annotation
      .font = Widget.getFont(fontLabel);

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

  protected abstract action(): void;
}
