import App from "./app";

abstract class Shortcut<
  Input = never,
  Output = never,
  Schema = never,
> extends App<Nullable<Input>, Null<Output>, Schema> {
  protected getInput() {
    const input = args.shortcutParameter as undefined | Input;

    return typeof input === "undefined" ? null : input;
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["runtime"]>) {
    log(runtime);
    Script.setShortcutOutput(runtime);

    return runtime;
  }
}

export default Shortcut;
