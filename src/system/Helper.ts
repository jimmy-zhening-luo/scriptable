const hp_App: typeof App = importModule(
  "app/App",
) as typeof App;

abstract class Helper<
  I extends Nullable<Definite> = null,
  O extends Nullable<Definite> = null,
  C extends ISetting = NullRecord,
> extends hp_App<
    "Helper",
    I,
    O,
    C
  > {
  private readonly __input: Nullable<I>;

  constructor(
    input?: I,
    debug?: boolean,
  ) {
    super(
      "Helper",
      debug,
    );
    this.__input = input ?? null;
  }

  public get setInput(): Nullable<I> {
    try {
      return this.__input;
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
