import IApp from "./app";

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
      args[shareInputType].length === 0
        ? undefined
        : args[shareInputType],
      config.runsInActionExtension,
    );
  }

  protected output(
    output: ReturnType<Share<ShareOutput>["runtime"]>,
  ) {
    if (typeof output === "string")
      Pasteboard
        .copy(
          output,
        );
  }
}
