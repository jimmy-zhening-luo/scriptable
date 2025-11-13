import IApp from "../core";

export default abstract class<
  Setting = never,
  Output extends Void<string> = string,
> extends IApp<
    Setting,
    Output,
    readonly string[]
  > {
  protected readonly production = config.runsInActionExtension;
  protected readonly emit = 2;

  constructor(
    inputType:
      | "plainTexts"
      | "urls"
      | "fileURLs"
      = "plainTexts",
  ) {
    const inputs = args[inputType];

    super(inputs.length === 0 ? null : inputs);
  }

  protected output(output: Output) {
    if (typeof output === "string" && output !== "")
      Pasteboard.copy(output);
  }
}
