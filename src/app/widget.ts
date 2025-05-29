import IApp from "./proto";

export default abstract class Widget<
  Schema = never,
> extends IApp<
    string,
    null,
    Schema
  > {
  protected readonly widget = new ListWidget();

  protected contextual() {
    return config.runsInWidget
      || config.runsInAccessoryWidget
      || this.tapped();
  }

  protected tapped() {
    return config.runsInApp
      && typeof args.widgetParameter === "string";
  }

  protected getInput() {
    return (args.widgetParameter ?? undefined) as Undef<string>;
  }

  protected output(runtime: ReturnType<Widget["runtime"]>) {
    this.widget.refreshAfterDate = new Date(Date.now() + 30000);
    Script.setWidget(this.widget);

    return runtime;
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
}
