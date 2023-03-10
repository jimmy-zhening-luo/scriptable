const se_Utility: typeof Utility = importModule("utility/Utility");

class Secret extends se_Utility {
  constructor(subpath: string) {
    try {
      super("Secret", Secret.ReadOnlyFile, subpath);
    } catch (e) {
      throw new Error(
        `Secret: constructor: Error creating Secret object: \n${e}`,
      );
    }
  }

  get secret(): typeof Secret.prototype.data {
    try {
      return this.data;
    } catch (e) {
      throw new Error(`Secret: secret: Error getting secret: \n${e}`);
    }
  }

  get key(): typeof Secret.prototype.secret {
    try {
      return this.secret;
    } catch (e) {
      throw new Error(`Secret: key: Error getting key: \n${e}`);
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
