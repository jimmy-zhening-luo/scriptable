import IApp from "../core";

const enum InputSource {
  String,
  Array,
  Object,
}

export default abstract class<
  Setting = never,
  Output = void,
  Input extends object | Unflat<string, true> = string,
> extends IApp<
    Setting,
    Void<Output>,
    Input
  > {
  protected readonly production = config.runsWithSiri;

  constructor(
    source:
      | InputSource.String
      | (Input extends readonly string[] ? InputSource.Array : Input extends object ? InputSource.Object : never)
      = InputSource.String,
  ) {
    super(
      source
        ? source === InputSource.Array
          ? args.plainTexts as unknown as Input & readonly string[]
          : args.shortcutParameter as Undefined<Input>
        : args.plainTexts[0] as Undefined<Input & string>,
    );
  }

  protected output(output: Void<Output>) {
    Script.setShortcutOutput(output ?? null);
  }
}
