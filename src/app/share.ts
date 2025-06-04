import IApp from "./proto";

export default abstract class Share<
  Output extends string = never,
  Setting = never,
> extends IApp<
    string[],
    Null<Output>,
    Setting
  > {
  protected readonly abstract shareInputType: (
    | "plainTexts"
    | "urls"
    | "fileURLs"
  );

  constructor() {
    super(
      config.runsInActionExtension,
    )
  }

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
