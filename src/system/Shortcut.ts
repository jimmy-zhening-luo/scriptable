const sh_App: typeof App = importModule(
  "app/App",
) as typeof App;

abstract class Shortcut<
  I extends ShortcutInput = null,
  O = null,
  C extends Config = Record<string, never>,
> extends sh_App<I, O, C> {
  public static get App(): typeof App {
    try {
      return sh_App;
    }
    catch (e) {
      throw new ReferenceError(
        `Shortcut.js: Error getting shortcut App class: \n${e as string}`,
      );
    }
  }

  public get input(): App<I, O, C>["input"] {
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
        `Shortcut.js: Error getting raw file, string, or Image input from Scriptable.args.shortcutParameter: \n${e as string}`,
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
        `Shortcut.js: Error casting Scriptable.args.shortcutParameter to string: \n${e as string}`,
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
        `Shortcut.js: Error constraining Scriptable.args.shortcutParameter to type I & !(string | Image): \n${e as string}`,
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

  protected override setOut(runtimeOutput: O): void {
    try {
      Script.setShortcutOutput(runtimeOutput);

      return;
    }
    catch (e) {
      throw new ReferenceError(
        `Shortcut.js: Error setting shortcut output: \n${e as string}`,
      );
    }
  }
}

module.exports = Shortcut;
