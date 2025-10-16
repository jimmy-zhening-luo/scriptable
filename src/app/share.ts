import IApp from "../core";

export default abstract class Share<
  Output extends string = never,
  Setting = never,
> extends IApp<
    ArrayN,
    Null<Output>,
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

  protected output(output: ReturnType<Share<Output>["runtime"]>) {
    if (typeof output === "string" && output !== "")
      Pasteboard.copy(output);
  }
}
