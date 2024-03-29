const sh_Application: typeof Application = importModule(
  "application/Application",
) as typeof Application;

abstract class Shortcut<
  In = string,
  Out = string,
  C extends Config = Record<string, never>,
> extends sh_Application<
    C,
    In,
    Out,
    Out
  > {
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

  public get args(): typeof args {
    try {
      return args;
    }
    catch (e) {
      throw new ReferenceError(
        `Shortcut.js: Error getting shortcut input from Scriptable 'args' object (which by design is loaded with any input parameters passed from Shortcuts when executing a Scriptable script): \n${e as string}`,
      );
    }
  }

  public get input(): undefined | In {
    try {
      // TBD: Validate that the input, if not a string, is valid JSON of type I
      return this.args.shortcutParameter as undefined | In;
    }
    catch (e) {
      throw new ReferenceError(
        `Shortcut.js: Error getting shortcut input from 'args.shortcutParameter': \n${e as string}`,
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

  public handleOutput(
    runtimeOutput: Out,
  ): Out {
    try {
      return runtimeOutput;
    }
    catch (e) {
      throw new SyntaxError(
        `Shortcut.js: Error setting shortcut output: \n${e as string}`,
      );
    }
  }
}

namespace Shortcut {
  export interface ShortcutDictionary {
    [key: string]: ListContent | ShortcutDictionary;
  }

  export type ListContent =
    | string
    | number
    | boolean
    | ShortcutDictionary
    | ListContent[];
}

module.exports = Shortcut;
