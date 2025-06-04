import IApp from "./proto";

export default abstract class Shortcut<
  ShortcutInput extends Unflat = never,
  ShortcutOutput = null,
  Setting = never,
> extends IApp<
    ShortcutInput,
    Null<ShortcutOutput>,
    Setting
  > {
  constructor(
    private readonly inputType: (
      | "string"
      | (
        ShortcutInput extends readonly string[]
          ? "multi"
          : never
      )
    ) = "string",
  ) {
    super(
      config.runsWithSiri,
    );
  }

  protected getInput() {
    return (
      this.inputType === "multi"
        ? args.plainTexts.length === 0
          ? undefined
          : args.plainTexts as unknown as ShortcutInput & readonly string[]
        : args.plainTexts[0] as Undef<ShortcutInput & string>
    )
    ?? undefined;
  }

  protected output(output: ReturnType<Shortcut<ShortcutInput, ShortcutOutput>["runtime"]>) {
    Script.setShortcutOutput(output);
  }

  protected local(): void {
    return undefined;
  }
}
