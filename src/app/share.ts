import IApp from "../core";

export default abstract class Share<
  ShareOutput extends string = never,
  Setting = never,
> extends IApp<
    ArrayN,
    Null<ShareOutput>,
    Setting
  > {
  constructor(
    inputType:
      | "plainTexts"
      | "urls"
      | "fileURLs"
      = "plainTexts",
  ) {
    const { [inputType]: inputs } = args;

    super(
      inputs.length === 0
        ? null
        : inputs,
      config.runsInActionExtension,
    );
  }

  protected output(output: ReturnType<Share<ShareOutput>["runtime"]>) {
    if (typeof output === "string" && output !== "")
      Pasteboard.copy(output);
  }
}
