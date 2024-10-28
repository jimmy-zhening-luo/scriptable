import type { App } from "./app";

const app = importModule<typeof App>("./app");

abstract class Shortcut<
  Input = never,
  Output = never,
  Schema = never,
> extends app<"Shortcut", Nullable<Input>, Null<Output>, Schema> {
  protected type = "Shortcut" as const;

  protected getInput() {
    const input = args.shortcutParameter as undefined | Input;

    return typeof input === "undefined" ? null : input;
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["run"]>) {
    log(runtime);
    Script.setShortcutOutput(runtime);

    return runtime;
  }
}

module.exports = Shortcut;
export type { Shortcut };
