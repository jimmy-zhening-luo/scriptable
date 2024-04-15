const sh_App: typeof App = importModule(
  "app/App",
) as typeof App;

abstract class Shortcut<
  I extends ShortcutInput = null,
  O = null,
  C extends Config = Record<string, never>,
> extends sh_App<
    "Shortcut",
    I,
    O,
    C
  > {
  constructor() {
    super("Shortcut");
  }

  public get input(): App<string, I, O, C>["input"] {
    try {
      const flat: unknown = Array.isArray(args.shortcutParameter)
        ? args.shortcutParameter.length === 1
          ? args.shortcutParameter[0]
          : null
        : args.shortcutParameter;

      return flat === null
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
    catch (e) {
      throw new EvalError(
        `Shortcut: input: \n${e as string}`,
      );
    }
  }

  public get inputText(): null | string {
    try {
      return this.input === null
        ? null
        : String(this.input);
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: inputText: \n${e as string}`,
      );
    }
  }

  public get inputData(): null | I {
    try {
      return this.input === null
        || typeof this.input === "string"
        || Object.values(this.input)
          .every(val => val === undefined || val === null || val === "")
        ? null
        : this.input;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: inputData: \n${e as string}`,
      );
    }
  }

  protected override setOutput(
    runtimeOutput: O,
  ): void {
    try {
      Script.setShortcutOutput(runtimeOutput);

      return;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut: setOutput: \n${e as string}`,
      );
    }
  }
}

module.exports = Shortcut;
