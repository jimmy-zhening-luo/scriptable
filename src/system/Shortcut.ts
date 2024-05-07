const sh_App: typeof App = importModule(
  "app/App",
) as typeof App;

abstract class Shortcut<
  I extends Nullable<Definite> = null,
  O extends Nullable<Definite> = null,
  C extends ISetting = NullRecord,
> extends sh_App<
    "Shortcut",
    I,
    O,
    C
  > {
  constructor(debug?: boolean) {
    super(
      "Shortcut",
      debug,
    );
  }

  protected get setInput(): Nullable<I> {
    try {
      return (args.shortcutParameter as Nullable<I>) ?? null;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: setInput`,
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
}

module.exports = Shortcut;
