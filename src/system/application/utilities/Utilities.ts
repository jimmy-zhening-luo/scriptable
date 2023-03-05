class Utilities {
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
  get Utility(): typeof Utility {
    try {
      return Utilities.Utility;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Utility: Error importing Utility module: ${e}`,
      );
    }
  }

  get Files(): typeof Files {
    try {
      return Utilities.Files;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Files: Error getting Files module: ${e}`,
      );
    }
  }

  get Browser(): typeof Browser {
    try {
      return Utilities.Browser;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Browser: Error getting Browser module: ${e}`,
      );
    }
  }

  get ReadOnlyFile(): typeof ReadOnlyFile {
    try {
      return Utilities.ReadOnlyFile;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: ReadOnlyFile: Error getting ReadOnlyFile class: ${e}`,
      );
    }
  }

  get File(): typeof File {
    try {
      return Utilities.File;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: File: Error getting File class: ${e}`,
      );
    }
  }

  get Bookmark(): typeof Bookmark {
    try {
      return Utilities.Bookmark;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Bookmark: Error getting Bookmark class: ${e}`,
      );
    }
  }

  get FilepathString(): typeof FilepathString {
    try {
      return Utilities.FilepathString;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: FilepathString: Error getting FilepathString class: ${e}`,
      );
    }
  }

  get Url(): typeof Url {
    try {
      return Utilities.Url;
    } catch (e) {
      throw new ReferenceError(`Utilities: Url: Error getting Url class: ${e}`);
    }
  }

  get Api(): typeof Api {
    try {
      return Utilities.Api;
    } catch (e) {
      throw new ReferenceError(`Utilities: Api: Error getting Api class: ${e}`);
    }
  }

  get Callback(): typeof Callback {
    try {
      return Utilities.Callback;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Callback: Error getting Callback class: ${e}`,
      );
    }
  }

  get Endpoint(): typeof Endpoint {
    try {
      return Utilities.Endpoint;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Endpoint: Error getting Endpoint class: ${e}`,
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

  static get Utility(): typeof Utility {
    try {
      return importModule("utility/Utility");
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Utility: Error importing Utility module: ${e}`,
      );
    }
  }

  static get Files(): typeof Files {
    try {
      return Utilities.Utility.Files;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Files: Error importing Files module: ${e}`,
      );
    }
  }

  static get Browser(): typeof Browser {
    try {
      return Utilities.Utility.Browser;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Browser: Error importing Browser module: ${e}`,
      );
    }
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    try {
      return Utilities.Utility.ReadOnlyFile;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: ReadOnlyFile: Error importing ReadOnlyFile class: ${e}`,
      );
    }
  }

  static get File(): typeof File {
    try {
      return Utilities.Utility.File;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: File: Error importing File class: ${e}`,
      );
    }
  }

  static get Bookmark(): typeof Bookmark {
    try {
      return Utilities.Utility.Bookmark;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Bookmark: Error importing Bookmark class: ${e}`,
      );
    }
  }

  static get FilepathString(): typeof FilepathString {
    try {
      return Utilities.Utility.FilepathString;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: FilepathString: Error importing FilepathString class: ${e}`,
      );
    }
  }

  static get Url(): typeof Url {
    try {
      return Utilities.Utility.Url;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Url: Error importing Url class: ${e}`,
      );
    }
  }

  static get Api(): typeof Api {
    try {
      return Utilities.Utility.Api;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Api: Error importing Api class: ${e}`,
      );
    }
  }

  static get Callback(): typeof Callback {
    try {
      return Utilities.Utility.Callback;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Callback: Error importing Callback class: ${e}`,
      );
    }
  }

  static get Endpoint(): typeof Endpoint {
    try {
      return Utilities.Utility.Endpoint;
    } catch (e) {
      throw new ReferenceError(
        `Utilities: Endpoint: Error importing Endpoint class: ${e}`,
      );
    }
  }
}

module.exports = Utilities;
