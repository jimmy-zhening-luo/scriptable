import type { App } from "./app/index";

const app = importModule<typeof App>("./app/index");

abstract class Shortcut<
  Input = never,
  Output = never,
  Schema = never,
> extends app<"Shortcut", Nullable<Input>, Null<Output>, Schema> {
  protected apptype = "Shortcut" as const;

  protected get getInput() {
    const { shortcutParameter } = args as { shortcutParameter: Null<undefined | Input> };

    return shortcutParameter ?? null;
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["run"]>) {
    Script.setShortcutOutput(runtime);

    return runtime;
  }
}

module.exports = Shortcut;
export type { Shortcut };
