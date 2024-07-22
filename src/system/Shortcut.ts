const app = importModule<typeof App>(
  `app/App`,
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
      if (typeof this._getInput === "undefined") {
        const shortcutInput = args.shortcutParameter as Null<undefined | Input>,
          definedShortcutInput = shortcutInput ?? null;

        this._getInput = definedShortcutInput;
      }

      return this._getInput;
    }
    catch (e) {
      throw new ReferenceError(
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
      throw new EvalError(
        `Shortcut: output`,
        { cause: e },
      );
    }
  }

  private _getInput?: Shortcut<Input>["input"];
}

module.exports = Shortcut;
