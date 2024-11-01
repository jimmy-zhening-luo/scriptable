import App from "./app";

abstract class Shortcut<
  Input = never,
  Output = never,
  Schema = never,
> extends App<"Shortcut", Nullable<Input>, Null<Output>, Schema> {
  protected type = "Shortcut" as const;

  protected getInput() {
    const input = args.shortcutParameter as undefined | Input;

    return typeof input === "undefined" ? null : input;
  }

  protected async output(runtime: ReturnType<Shortcut<Input, Output>["runtime"]>) {
    log(runtime);
    Script.setShortcutOutput(runtime);

    return runtime;
  }
}

export default Shortcut;
