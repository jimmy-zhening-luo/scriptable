import IApp from "./proto";
import Time from "../lib/time";

export default abstract class Widget<
  Setting = never,
> extends IApp<
    string,
    void,
    Setting
  > {
  protected static readonly Time = Time;

  private static readonly FONTS = {
    title: Font.semiboldSystemFont(24),
    body: Font.systemFont(16),
    footnote: Font.lightSystemFont(10),
  } as const;
  protected readonly widget = new ListWidget;
  private readonly tapped: boolean;

  constructor(
    title: Null<string> = null,
    private readonly showLastRefresh = true,
  ) {
    const tapped = config.runsInApp
      && typeof args.widgetParameter === "string";

    super(
      args.widgetParameter as Null<string>
      ?? undefined,
      config.runsInWidget
      || config.runsInAccessoryWidget
      || tapped,
    );
    this.tapped = tapped;

    if (title !== "")
      this.addText(
        title
        ?? this.app,
        "title",
      );
  }

  protected output() {
    if (this.showLastRefresh)
      this.addText(
        "Latest: " + this.date(
          {
            format: "h:mm a",
          },
        ),
        "footnote",
      );

    this.widget.refreshAfterDate = new Date(Date.now() + 30000);
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

  protected addText(
    text: string,
    font: keyof typeof Widget["FONTS"] = "body",
  ) {
    this
      .widget
      .addText(text)
      .font = Widget.FONTS[font];
  }

  protected addClock() {
    this
      .widget
      .addDate(
        new Time()
          .midnight
          .toDate(),
      )
      .applyTimerStyle();
  }

  protected date(
    {
      date = new Date,
      format = "MMMM d, y h:mm:ss a",
    } = {},
  ) {
    const formatter = new DateFormatter;

    formatter.dateFormat = format;

    return formatter.string(date);
  }

  protected abstract action(): void;
}
