import IApp from "./proto";

export default abstract class Shortcut<
  Input extends Unflat = never,
  Output = null,
  Schema = never,
> extends IApp<
    Input,
    Null<Output>,
    Schema
  > {
  protected readonly contextual = config.runsWithSiri;
  protected inputType: (
    | "string"
    | (
      Input extends readonly string[]
        ? "multi"
        : never
    )
  ) = "string";

  protected getInput() {
    return (
      this.inputType === "multi"
        ? args.plainTexts.length === 0
          ? undefined
          : args.plainTexts as Input
        : args.plainTexts[0] as Undef<Input>;
    )
    ?? undefined;
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["runtime"]>) {
    Script.setShortcutOutput(runtime);

    return runtime;
  }

  protected local(): void {
    return undefined;
  }
}
