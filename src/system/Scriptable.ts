const sc_Application: typeof Application = importModule(
  "application/Application",
);

abstract class Scriptable extends sc_Application {
  get input(): never {
    throw new ReferenceError(
      `Scriptable.js: input: the Scriptable script tried to access its 'input' member, but Scriptable scripts are not allowed to have input.`,
    );
  }

  handleOutput(output: string): void {
    try {
      console.log(output);
    } catch (e) {
      throw new EvalError(
        `Scriptable.js: Error setting Scriptable script output: \n${e}`,
      );
    }
  }

  protected override get configSubpath(): string {
    try {
      const SCRIPTABLE_CONFIG_SUBPATH_ROOT: string = "Scriptable";
      return super.configSubpath === ""
        ? SCRIPTABLE_CONFIG_SUBPATH_ROOT
        : `${super.configSubpath}/${SCRIPTABLE_CONFIG_SUBPATH_ROOT}`;
    } catch (e) {
      throw new EvalError(
        `Scriptable.js: Error getting shortcut config subpath: \n${e}`,
      );
    }
  }

  static get Application(): typeof Application {
    try {
      return sc_Application;
    } catch (e) {
      throw new ReferenceError(
        `Scriptable.js: Error getting shortcut Application class: \n${e}`,
      );
    }
  }
}

module.exports = Scriptable;
