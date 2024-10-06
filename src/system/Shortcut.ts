import type { App } from "./app/index";

const app = importModule<typeof App>("./app/index");

abstract class Shortcut<
  Input = never,
  Output = never,
  Schema = never,
> extends app<"Shortcut", Nullable<Input>, Null<Output>, Schema> {
  protected type = "Shortcut" as const;

  protected getInput() {
    return (args.shortcutParameter as Null<undefined | Input>) ?? null;
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["run"]>) {
    log(runtime);
    Script.setShortcutOutput(runtime);

    return runtime;
  }
}

module.exports = Shortcut;
export type { Shortcut };
