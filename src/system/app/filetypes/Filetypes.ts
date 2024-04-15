class Filetypes {
  public static get Setting(): typeof Setting {
    try {
      return importModule("Setting") as typeof Setting;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetypes: import Setting: \n${e as string}`,
      );
    }
  }

  public static get Storage(): typeof Storage {
    try {
      return importModule("Storage") as typeof Storage;
    }
    catch (e) {
      throw new ReferenceError(
        `Filetypes: import Storage: \n${e as string}`,
      );
    }
  }
}

module.exports = Filetypes;
