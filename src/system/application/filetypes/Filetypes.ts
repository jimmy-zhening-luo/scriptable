class Filetypes {
  public static get Filetype(): typeof Filetype {
    return Filetypes.Config.Filetype;
  }

  public static get IOFile(): typeof IOFile {
    return Filetypes.Filetype.IOFile;
  }

  public static get ReadOnlyIOFile(): typeof ReadOnlyIOFile {
    return Filetypes.Filetype.ReadOnlyIOFile;
  }

  public static get Config(): typeof Config {
    return importModule("Config") as typeof Config;
  }

  public static get Secret(): typeof Secret {
    return importModule("Secret") as typeof Secret;
  }

  public static get Storage(): typeof Storage {
    return importModule("Storage") as typeof Storage;
  }
}

module.exports = Filetypes;
