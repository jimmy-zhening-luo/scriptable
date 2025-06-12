import IApp from "./app";

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
    inputType: (
      | "string"
      | (
        ShortcutInput extends readonly string[]
          ? "array"
          : never
      )
    ) = "string",
  ) {
    super(
      (
        inputType === "array"
          ? args.plainTexts.length === 0
            ? undefined
            : args.plainTexts as unknown as ShortcutInput & readonly string[]
          : args.plainTexts[0] as Undef<ShortcutInput & string>
      )
      ?? undefined,
      config.runsWithSiri,
    );
  }

  protected output(output: ReturnType<Shortcut<ShortcutInput, ShortcutOutput>["runtime"]>) {
    Script.setShortcutOutput(output);
  }

  protected local(): void {
    return undefined;
  }
}
