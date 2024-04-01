const sh_Application: typeof Application = importModule(
  "application/Application",
) as typeof Application;

abstract class Shortcut<
  I extends typeof args.shortcutParameter = null,
  O = null,
  C extends Config = Record<string, never>,
> extends sh_Application<I, O, C> {
  public static get Application(): typeof Application {
    try {
      return sh_Application;
    }
    catch (e) {
      throw new ReferenceError(
        `Shortcut.js: Error getting shortcut Application class: \n${e as string}`,
      );
    }
  }

  public get input(): null | I {
    try {
      return args.shortcutParameter === undefined
        ? null
        : args.shortcutParameter as null | I;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut.js: Error getting shortcut input from Scriptable 'args' object: \n${e as string}`,
      );
    }
  }

  protected override get settingSubpathRoot(): string {
    try {
      const SHORTCUT_SETTING_SUBPATH_ROOT: string = "Shortcut";

      return super.settingSubpathRoot === ""
        ? SHORTCUT_SETTING_SUBPATH_ROOT
        : `${super.settingSubpathRoot}/${SHORTCUT_SETTING_SUBPATH_ROOT}`;
    }
    catch (e) {
      throw new EvalError(
        `Shortcut.js: Error getting shortcut setting subpath: \n${e as string}`,
      );
    }
  }
}

module.exports = Shortcut;
