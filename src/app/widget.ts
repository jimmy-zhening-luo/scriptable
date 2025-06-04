import IApp from "./proto";

export default abstract class Widget<
  Setting = never,
> extends IApp<
    string,
    void,
    Setting
  > {
  private static readonly FONTS = {
    title: Font.semiboldSystemFont(24),
    body: Font.systemFont(16),
    footnote: Font.lightSystemFont(10),
  } as const;
  protected readonly tapped: boolean;
  protected readonly widget = new ListWidget;

  constructor(
    protected readonly title: string = this.app,
    protected readonly showLastRefresh = true,
  ) {
    const tapped = config.runsInApp
      && typeof args.widgetParameter === "string";

    super(
      config.runsInWidget
      || config.runsInAccessoryWidget
      || tapped,
    );
    this.tapped = tapped;
    this.addText(
      this.title,
      "title",
    );
  }

  protected getInput() {
    return args.widgetParameter as Null<string>
      ?? undefined;
  }

  protected output() {
    if (this.tapped)
      this.action();

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
  protected abstract action(): void;
}
