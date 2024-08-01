const app = importModule<typeof App>(
  "app/index",
);

abstract class Shortcut<
  Input = never,
  Output = never,
  Schema = never,
> extends app<"Shortcut", Nullable<Input>, Null<Output>, Schema> {
  constructor() {
    super("Shortcut");
  }

  protected get getInput() {
    try {
      const { shortcutParameter } = args as { shortcutParameter: Null<undefined | Input> };

      return shortcutParameter ?? null;
    }
    catch (e) {
      throw new Error(
        `Shortcut: getInput`,
        { cause: e },
      );
    }
  }

  protected output(runtime: ReturnType<Shortcut<Input, Output>["run"]>) {
    try {
      Script.setShortcutOutput(runtime);

      return runtime;
    }
    catch (e) {
      throw new Error(
        `Shortcut: output`,
        { cause: e },
      );
    }
  }
}

module.exports = Shortcut;
