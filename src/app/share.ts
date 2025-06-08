import IApp from "./proto";

export default abstract class Share<
  ShareOutput extends string = never,
  Setting = never,
> extends IApp<
    readonly string[],
    Null<ShareOutput>,
    Setting
  > {
  constructor(
    shareInputType: (
      | "plainTexts"
      | "urls"
      | "fileURLs"
    ) = "plainTexts",
  ) {
    super(
      config.runsInActionExtension,
      args[shareInputType].length === 0
        ? undefined
        : args[shareInputType],
    );
  }

  protected output(output: ReturnType<Share<ShareOutput>["runtime"]>) {
    if (typeof output === "string")
      Pasteboard.copy(output);
  }

  protected local(): void {
    return undefined;
  }
}
