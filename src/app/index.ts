import IApp from "../core";

export default abstract class<
  Setting = never,
  Output = void,
  Input extends object | string = string,
  History extends string | Table = never,
> extends IApp<
    Setting,
    Void<Output>,
    Input,
    History
  > {
  protected readonly production = config.runsWithSiri;

  constructor(
    source:
      | false
      | (Input extends object ? true : never)
      = false,
  ) {
    super(
      source
        ? args.shortcutParameter as Undefined<Input>
        : args.plainTexts[0] as Undefined<Input & string>,
    );
  }

  protected output(output: Void<Output>) {
    Script.setShortcutOutput(output ?? null);
  }
}
