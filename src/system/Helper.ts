import type App from "./app/App.js";

const app = importModule(
  `app/App`,
) as typeof App;

export default abstract class Helper<
  Input = void,
  Output = void,
  Schema extends ISetting = never,
> extends app<
    "Helper"
    ,
    Input
    ,
    Output
    ,
    Schema
  > {
  constructor(
    private readonly argument: Helper<
      Input
    >[
      "input"
    ],
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
    runtime: ReturnType<
      Helper<
        Input
        ,
        Output
      >[
        "run"
      ]
    >,
  ) {
    try {
      return runtime;
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
