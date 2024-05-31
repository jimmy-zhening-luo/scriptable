const sh_App = importModule(
  `app/App`,
) as typeof App;

abstract class Shortcut<
  I = never,
  O = never,
  S extends ISetting = never,
> extends sh_App<
    "Shortcut"
    ,
    Null<
      NonNullable<
        I
      >
    >
    ,
    Null<
      O
    >
    ,
    S
  > {
  constructor(
    debug?: boolean,
  ) {
    super(
      "Shortcut",
      debug,
    );
  }

  protected get getInput() {
    try {
      if (
        typeof this
          ._getInput === "undefined"
      ) {
        const shortcutInput = args
          .shortcutParameter as Null<
            | undefined
            | I
        >;
        const definedShortcutInput = shortcutInput
          ?? null;

        this
          ._getInput = definedShortcutInput;
      }

      return this
        ._getInput;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: setInput`,
        { cause: e },
      );
    }
  }

  protected setOutput(
    runtimeOutput: ReturnType<
      Shortcut<
        I
        ,
        O
      >[
        "run"
      ]
    >,
  ) {
    try {
      Script
        .setShortcutOutput(
          runtimeOutput,
        );

      return runtimeOutput;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: setOutput`,
        { cause: e },
      );
    }
  }

  private _getInput?: Shortcut<I>["input"];
}

module.exports = Shortcut;
