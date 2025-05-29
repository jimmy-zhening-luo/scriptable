import IApp from "./proto";

export default abstract class Share<
  Output extends string = never,
  Schema = never,
> extends IApp<
    string[],
    Null<Output>,
    Schema
  > {
  protected readonly contextual = config.runsInActionExtension;

  protected readonly abstract shareInputType: (
    | "plainTexts"
    | "urls"
    | "fileURLs"
  );

  protected getInput() {
    return args[this.shareInputType].length === 0
      ? undefined
      : args[this.shareInputType];
  }

  protected output(runtime: ReturnType<Share<Output>["runtime"]>) {
    if (typeof runtime === "string")
      Pasteboard.copy(runtime);

    return runtime;
  }

  protected local(): void {
    return undefined;
  }
}
