import IApp from "../core";

export default abstract class<
  Setting = never,
  Output = void,
  Input extends Unflat<string, true> = never,
> extends IApp<
    Setting,
    Void<Output>,
    Input
  > {
  constructor(
    multi:
      | false
      | (Input extends readonly string[] ? true : never)
      = false,
  ) {
    super(
      multi
        ? args.plainTexts as unknown as Input & readonly string[]
        : args.plainTexts[0] as Undefined<Input & string>,
      config.runsWithSiri,
    );
  }

  protected output(output: Void<Output>) {
    Script.setShortcutOutput(output ?? null);
  }
}
