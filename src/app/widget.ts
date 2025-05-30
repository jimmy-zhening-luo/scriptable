import IApp from "./proto";

export default abstract class Widget<
  Schema = never,
> extends IApp<
    string,
    void,
    Schema
  > {
  protected readonly tapped = config.runsInApp
    && typeof args.widgetParameter === "string";
  protected readonly contextual = config.runsInWidget
    || config.runsInAccessoryWidget
    || this.tapped;
  protected readonly title: string = this.app;
  protected readonly showLastRefresh: boolean = true;
  protected readonly widget = new ListWidget;
  private readonly FONTS = {
    title: Font.semiboldSystemFont(12),
    body: Font.systemFont(10),
    footnote: Font.lightSystemFont(7),
  } as const;

  constructor() {
    super();
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
        `Latest: ${this.date({
          format: "h:mm a",
        })}`,
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
        (e: unknown) => {
          throw new EvalError(
            "Error presenting widget:",
            { cause: e },
          );
        },
      );
  }

  protected addText(
    text: string,
    font: keyof typeof this.FONTS = "body",
  ) {
    this
      .widget
      .addText(text)
      .font = this.FONTS[font];
  }
  protected abstract action(): void;
}
