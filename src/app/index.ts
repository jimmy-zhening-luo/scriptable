import IApp from "../core";

export default abstract class Shortcut<
  Setting = never,
  Output = void,
  Input extends Unflat = never,
> extends IApp<
    Setting,
    Void<Output>,
    Input
  > {
  constructor(
    multi:
      | false
      | (Input extends ArrayN ? true : never)
      = false,
  ) {
    const { plainTexts } = args;

    super(
      multi
        ? plainTexts as unknown as Input & readonly string[]
        : plainTexts[0] as Undefined<Input & string>,
      config.runsWithSiri,
    );
  }

  protected output(output: Void<Output>) {
    Script.setShortcutOutput(output ?? null);
  }
}
