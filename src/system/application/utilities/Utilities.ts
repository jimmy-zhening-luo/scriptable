class Utilities {
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
