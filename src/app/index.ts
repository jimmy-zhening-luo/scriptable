import IApp from "./proto";

export default abstract class Shortcut<
  Input = never,
  Output = null,
  Schema = never,
> extends IApp<
    Input,
    Null<Output>,
    Schema
  > {
  protected contextual() {
    return config.runsWithSiri;
  }

  protected getInput() {
    return this.stringInput === true
      ? args.plainTexts[0] as Undef<Input>
      : this.stringInput === "multi"
        ? args.plainTexts.length === 0
          ? undefined
          : args.plainTexts as Input
        : (args.shortcutParameter ?? undefined) as Undef<Input>;
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["runtime"]>) {
    Script.setShortcutOutput(runtime);

    return runtime;
  }

  protected local(): void {
    return undefined;
  }

  protected stringInput?: (
    | false
    | (Input extends string ? true : never)
    | (Input extends readonly string[] ? "multi" : never)
  );
}
