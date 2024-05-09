const hp_App: typeof App = importModule(
  "app/App",
) as typeof App;

abstract class Helper<
  I = void,
  O = void,
  C extends ISetting = never,
> extends hp_App<
    "Helper",
    I,
    O,
    C
  > {
  constructor(
    private readonly helperInput: Helper<I>["input"],
    debug?: boolean,
  ) {
    super(
      "Helper",
      debug,
    );
  }

  public get getInput(): Helper<I>["input"] {
    try {
      return this.helperInput;
    }
    catch (e) {
      throw new EvalError(
        `Helper: input`,
        { cause: e },
      );
    }
  }

  protected setOutput(runtimeOutput: ReturnType<Helper<I, O>["run"]>): ReturnType<Helper<I, O>["run"]> {
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
