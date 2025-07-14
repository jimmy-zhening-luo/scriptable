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
    const { [shareInputType]: inputs } = args;

    super(
      inputs.length === 0
        ? null
        : inputs,
      config
        .runsInActionExtension,
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
