const app = importModule(
  `app/App`,
) as typeof App;

abstract class Shortcut<
  Input = never,
  Output = never,
  Schema = never,
> extends app<"Shortcut", Nullable<Input>, Null<Output>, Schema> {
  constructor(debug?: boolean) {
    super(
      "Shortcut",
      debug,
    );
  }

  protected get getInput() {
    try {
      if (typeof this._getInput === "undefined") {
        const shortcutInput = args.shortcutParameter as Null<undefined | Input>;
        const definedShortcutInput = shortcutInput ?? null;

        this._getInput = definedShortcutInput;
      }

      return this._getInput;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: setInput`,
        { cause: e },
      );
    }
  }

  protected setOutput(runtime: ReturnType<Shortcut<Input, Output>["run"]>) {
    try {
      Script.setShortcutOutput(runtime);

      return runtime;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: setOutput`,
        { cause: e },
      );
    }
  }

  private _getInput?: Shortcut<Input>["input"];
}

module.exports = Shortcut;
