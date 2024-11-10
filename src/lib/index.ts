import App from "./app";

abstract class Shortcut<
  Input = never,
  Output = never,
  Schema = never,
> extends App<Input, Null<Output>, Schema> {
  protected getInput() {
    return args.shortcutParameter as undefined | Input;
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["runtime"]>) {
    log(runtime);
    Script.setShortcutOutput(runtime);

    return runtime;
  }
}

export default Shortcut;
