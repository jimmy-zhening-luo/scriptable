const n_IEngine: typeof IEngine = importModule(
  "engine/IEngine",
) as typeof IEngine;

class NativeEngine extends n_IEngine {
  public readonly native: stringful;

  constructor(
    keys: string | string[],
    native: string,
  ) {
    try {
      super(
        "native",
        keys,
      );

      if (native.length === 0)
        throw new SyntaxError(
          `native engine has empty provider field`,
        );
      else
        this.native = native as stringful;
    }
    catch (e) {
      throw new EvalError(
        `NativeEngine: ctor`,
        { cause: e },
      );
    }
  }

  protected options(): Required<Pick<SearchOutput, "native">> {
    try {
      return { "native": this.native };
    }
    catch (e) {
      throw new EvalError(
        `NativeEngine: options`,
        { cause: e },
      );
    }
  }
}

module.exports = NativeEngine;
