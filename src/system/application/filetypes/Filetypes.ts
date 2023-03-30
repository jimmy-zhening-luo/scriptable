class Filetypes {
  static get Config(): typeof Config {
    return importModule("Config");
  }

  static get Secret(): typeof Secret {
    return importModule("Secret");
  }

  static get Storage(): typeof Storage {
    return importModule("Storage");
  }

  static get Filetype(): typeof Filetype {
    return Filetypes.Config.Filetype;
  }

  static get File(): typeof File {
    return Filetypes.Filetype.File;
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    return Filetypes.Filetype.ReadOnlyFile;
  }
}

module.exports = Filetypes;
