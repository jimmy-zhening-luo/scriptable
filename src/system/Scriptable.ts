const sc_Application: typeof Application = importModule(
  "application/Application",
) as typeof Application;

abstract class Scriptable extends sc_Application {
  get input(): never {
    throw new ReferenceError(
      `Scriptable.js: input: the Scriptable script tried to access its 'input' member, but Scriptable scripts are not allowed to have input.`,
    );
  }

  handleOutput(): void {}

  protected override get configSubpathRoot(): string {
    try {
      const SCRIPTABLE_CONFIG_SUBPATH_ROOT: string = "Scriptable";
      return super.configSubpathRoot === ""
        ? SCRIPTABLE_CONFIG_SUBPATH_ROOT
        : `${super.configSubpathRoot}/${SCRIPTABLE_CONFIG_SUBPATH_ROOT}`;
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
