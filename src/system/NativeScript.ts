const sc_Application: typeof Application = importModule(
  "application/Application",
) as typeof Application;

abstract class NativeScript<
  C extends Config = Record<string, never>,
> extends sc_Application<C> {
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

  protected override get settingSubpathRoot(): string {
    try {
      const SCRIPTABLE_SETTING_SUBPATH_ROOT: string = "NativeScript";

      return super.settingSubpathRoot === ""
        ? SCRIPTABLE_SETTING_SUBPATH_ROOT
        : `${super.settingSubpathRoot}/${SCRIPTABLE_SETTING_SUBPATH_ROOT}`;
    }
    catch (e) {
      throw new EvalError(
        `NativeScript.js: Error getting shortcut setting subpath: \n${e as string}`,
      );
    }
  }

  public handleOutput(): void {
    try {
      Script.complete();
    }
    catch (e) {
      throw new EvalError(
        `NativeScript.js: Error ending native script execution by using Scriptable's documented method of calling Script.complete(): \n${e as string}`,
      );
    }
  }
}

module.exports = NativeScript;
