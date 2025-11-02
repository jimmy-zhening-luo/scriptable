import IApp from "../core";

export default abstract class<
  Setting = never,
  Output extends Void<string> = string,
> extends IApp<
    Setting,
    Output,
    readonly string[]
  > {
  constructor(
    inputType:
      | "plainTexts"
      | "urls"
      | "fileURLs"
      = "plainTexts",
  ) {
    const inputs = args[inputType];

    super(
      inputs.length === 0
        ? null
        : inputs,
      config.runsInActionExtension,
    );
  }

  protected output(output: Output) {
    if (typeof output === "string" && output !== "")
      Pasteboard.copy(output);
  }
}
