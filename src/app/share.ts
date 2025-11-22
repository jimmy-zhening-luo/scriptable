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

  constructor(
    inputType:
      | "plainTexts"
      | "urls"
      | "fileURLs"
      = "plainTexts",
  ) {
    const inputs = args[inputType];

    super(inputs.length ? inputs : null);
  }

  protected output(output: Output) {
    if (output && typeof output === "string")
      Pasteboard.copy(output);
  }
}
