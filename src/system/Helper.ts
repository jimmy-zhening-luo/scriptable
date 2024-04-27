const hp_App: typeof App = importModule("app/App") as typeof App;

abstract class Helper<
  I extends Nullable<Definite> = null,
  O extends Nullable<Definite> = null,
  C extends Config = NullRecord,
> extends hp_App<
    "Helper",
    I,
    O,
    C
  > {
  private readonly _input: Helper<I>["input"];

  constructor(input?: I) {
    super("Helper");
    this._input = input ?? null;
  }

  public get input(): Nullable<I> {
    try {
      return this._input;
    }
    catch (e) {
      throw new EvalError(
        `Helper: input`,
        { cause: e },
      );
    }
  }

  protected setOutput(runtimeOutput: Nullable<O>): Nullable<O> {
    try {
      return runtimeOutput;
    }
    catch (e) {
      throw new EvalError(
        `Helper: setOutput`,
        { cause: e },
      );
    }
  }
}

module.exports = Helper;
