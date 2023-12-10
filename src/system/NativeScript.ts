const sc_Application: typeof Application = importModule(
  "application/Application",
) as typeof Application;

abstract class NativeScript extends sc_Application {
  public static get Application(): typeof Application {
    try {
      return sc_Application;
    }
    catch (e) {
      throw new ReferenceError(
        `NativeScript.js: Error getting shortcut Application class: \n${e as string}`,
      );
    }
  }

  public get input(): never {
    throw new ReferenceError(
      `NativeScript.js: input: the NativeScript tried to access its 'input' member, but NativeScripts are not allowed to have input.`,
    );
  }

  protected override get configSubpathRoot(): string {
    try {
      const SCRIPTABLE_CONFIG_SUBPATH_ROOT: string = "NativeScript";

      return super.configSubpathRoot === ""
        ? SCRIPTABLE_CONFIG_SUBPATH_ROOT
        : `${super.configSubpathRoot}/${SCRIPTABLE_CONFIG_SUBPATH_ROOT}`;
    }
    catch (e) {
      throw new EvalError(
        `NativeScript.js: Error getting shortcut config subpath: \n${e as string}`,
      );
    }
  }

  public handleOutput(): void {}
}

module.exports = NativeScript;
