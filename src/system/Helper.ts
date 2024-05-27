const hp_App = importModule(
  "app/App",
) as typeof App;

abstract class Helper<
  I = void,
  O = void,
  S extends ISetting = never,
> extends hp_App<
    "Helper"
    ,
    I
    ,
    O
    ,
    S
  > {
  constructor(
    private readonly argument: Helper<I>["input"],
    debug?: boolean,
  ) {
    super(
      "Helper",
      debug,
    );
  }

  protected get getInput() {
    try {
      return this
        .argument;
    }
    catch (e) {
      throw new EvalError(
        `Helper: input`,
        { cause: e },
      );
    }
  }

  protected setOutput(
    runtimeOutput: ReturnType<Helper<I, O>["run"]>,
  ) {
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
