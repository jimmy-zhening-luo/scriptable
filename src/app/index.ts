import IApp from "../core";

const enum InputSource {
  String,
  Array,
  Object,
}

export default abstract class<
  Setting = never,
  Output = void,
  Input extends object | Unflat<string, true> = never,
> extends IApp<
    Setting,
    Void<Output>,
    Input
  > {
  constructor(
    source:
      | InputSource.String
      | (Input extends readonly string[] ? Input.Array : Input extends object ? Input.Object : never)
      = InputSource.String,
  ) {
    super(
      source === Input.String
        ? args.plainTexts[0] as Undefined<Input & string>
        : source === Input.Array
          ? args.plainTexts as unknown as Input & readonly string[]
          : args.shortcutParameter as Undefined<Input>,
      config.runsWithSiri,
    );
  }

  protected output(output: Void<Output>) {
    Script.setShortcutOutput(output ?? null);
  }
}
