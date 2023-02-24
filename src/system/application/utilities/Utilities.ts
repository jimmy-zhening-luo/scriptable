class Utilities {

  static get Config(): typeof Config {
    try {
      return importModule("Config");
    } catch (e) {
      console.error(`Utilities: Config: Error importing Config module: ${e}`);
      throw e;
    }
  }

  static get Storage(): typeof Storage {
    try {
      return importModule("Storage");
    } catch (e) {
      console.error(`Utilities: Storage: Error importing Storage module: ${e}`);
      throw e;
    }
  }

  static get Secret(): typeof Secret {
    try {
      return importModule("Secret");
    } catch (e) {
      console.error(`Utilities: Secret: Error importing Secret module: ${e}`);
      throw e;
    }
  }

}

module.exports = Utilities;
