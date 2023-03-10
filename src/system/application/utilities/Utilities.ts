class Utilities {
  static get Config(): typeof Config {
    try {
      return importModule("Config");
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Config: Error importing Config module: \n${e}`,
      );
    }
  }

  static get Storage(): typeof Storage {
    try {
      return importModule("Storage");
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Storage: Error importing Storage module: \n${e}`,
      );
    }
  }

  static get Secret(): typeof Secret {
    try {
      return importModule("Secret");
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Secret: Error importing Secret module: \n${e}`,
      );
    }
  }

  static get Utility(): typeof Utility {
    try {
      return Utilities.Storage.Utility;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Utility: Error importing Utility module: \n${e}`,
      );
    }
  }

  static get Files(): typeof Files {
    try {
      return Utilities.Utility.Files;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Files: Error importing Files module: \n${e}`,
      );
    }
  }
}

module.exports = Utilities;
