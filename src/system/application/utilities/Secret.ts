const se_Utility: typeof Utility = importModule("utility/Utility");

class Secret extends se_Utility {
  constructor(subpath: string) {
    try {
      super("Secret", Secret.ReadOnlyFile, subpath);
    } catch (e) {
      throw new EvalError(
        `Secret: constructor: Error creating Secret object: \n${e}`,
      );
    }
  }

  static get Utility(): typeof Utility {
    try {
      return se_Utility;
    } catch (e) {
      throw new ReferenceError(
        `Secret: Utility: Error importing Utility module: \n${e}`,
      );
    }
  }
}

module.exports = Secret;
