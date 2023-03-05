const u_Utility: typeof Utility = importModule("utility/Utility");

class Utilities extends u_Utility {
  get Utility(): typeof Utility {
    try {
      return Utilities.Utility;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Utility: Error importing Utility module: ${e}`,
      );
    }
  }

  get Config(): typeof Config {
    try {
      return Utilities.Config;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Config: Error importing Config module: ${e}`,
      );
    }
  }

  get Storage(): typeof Storage {
    try {
      return Utilities.Storage;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Storage: Error importing Storage module: ${e}`,
      );
    }
  }

  get Secret(): typeof Secret {
    try {
      return Utilities.Secret;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Secret: Error importing Secret module: ${e}`,
      );
    }
  }

  static get Utility(): typeof Utility {
    try {
      return importModule("utility/Utility");
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Utility: Error importing Utility module: ${e}`,
      );
    }
  }

  static get Config(): typeof Config {
    try {
      return importModule("Config");
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Config: Error importing Config module: ${e}`,
      );
    }
  }

  static get Storage(): typeof Storage {
    try {
      return importModule("Storage");
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Storage: Error importing Storage module: ${e}`,
      );
    }
  }

  static get Secret(): typeof Secret {
    try {
      return importModule("Secret");
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Secret: Error importing Secret module: ${e}`,
      );
    }
  }
}

module.exports = Utilities;
