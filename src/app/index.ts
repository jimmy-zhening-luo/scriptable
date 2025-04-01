import App from "./proto";

export default abstract class Shortcut<
  Input = never,
  Output = null,
  Schema = never,
> extends App<Input, Null<Output>, Schema> {
  protected getInput() {
    return this.stringInput === true
      ? args.plainTexts[0] as unknown as Undef<Input>
      : args.shortcutParameter as Undef<Input>;
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["runtime"]>) {
    console.log(runtime);
    Script.setShortcutOutput(runtime);

    return runtime;
  }

  protected stringInput?: Input extends string ? boolean : never;
}
