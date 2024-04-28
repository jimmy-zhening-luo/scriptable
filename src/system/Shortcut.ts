const sh_App: typeof App = importModule("app/App") as typeof App;

abstract class Shortcut<
  I extends Nullable<Definite> = null,
  O extends Nullable<Definite> = null,
  C extends ISetting = NullRecord,
> extends sh_App<
    "Shortcut",
    string | I,
    O,
    C
  > {
  constructor(debug: boolean = false) {
    super(
      "Shortcut",
      debug,
    );
  }

  public get input(): Nullable<string | I> {
    try {
      if (this._input === undefined) {
        const flat: unknown = Array.isArray(args.shortcutParameter)
          ? args.shortcutParameter.length === 1
            ? args.shortcutParameter[0]
            : null
          : args.shortcutParameter;

        this._input =
          flat === null
          || flat === undefined
          || flat === ""
          || flat === 0
          || flat === -0
          || typeof flat === "number" && !Number.isFinite(flat)
          || flat === false
          || Array.isArray(flat)
            ? null
            : typeof flat === "number" || typeof flat === "boolean"
              ? String(flat)
              : flat as NonNullable<I>;
      }

      return this._input;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: input`,
        { cause: e },
      );
    }
  }

  public get inputText(): Nullable<string> {
    try {
      return this.input === null
        ? null
        : String(this.input);
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: inputText`,
        { cause: e },
      );
    }
  }

  public get inputData(): Nullable<I> {
    try {
      return this.input === null
        || typeof this.input === "string"
        || Object.values(this.input)
          .every(
            val =>
              val === undefined || val === null || val === "",
          )
        ? null
        : this.input;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: inputData`,
        { cause: e },
      );
    }
  }

  protected setOutput(runtimeOutput: Nullable<O>): Nullable<O> {
    try {
      Script.setShortcutOutput(runtimeOutput);

      return runtimeOutput;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: setOutput`,
        { cause: e },
      );
    }
  }

  private _input?: Shortcut<I>["input"];
}

module.exports = Shortcut;
