import App from "./app";

abstract class Shortcut<
  Input = never,
  Output = never,
  Schema = never,
> extends App<Input, Null<Output>, Schema> {
  protected getInput() {
    return this.stringInput === true
      ? args.plainTexts[0] as unknown as undefined | Input
      : args.shortcutParameter as undefined | Input;
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["runtime"]>) {
    log(runtime);
    Script.setShortcutOutput(runtime);

    return runtime;
  }

  protected readonly stringInput?: Input extends string ? true : false;
}

export default Shortcut;
