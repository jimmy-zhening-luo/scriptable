import IApp from "../core";

export default abstract class Shortcut<
  Input extends Unflat = never,
  Output = null,
  Setting = never,
> extends IApp<
    Input,
    Null<Output>,
    Setting
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

  protected output(output: ReturnType<Shortcut<Input, Output>["runtime"]>) {
    Script.setShortcutOutput(output);
  }
}
