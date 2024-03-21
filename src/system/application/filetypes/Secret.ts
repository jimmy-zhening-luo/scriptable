const key_Filetype: typeof Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Secret extends key_Filetype {
  constructor(
    subpath: string,
  ) {
    try {
      super(
        "Secret",
        subpath,
      );
    }
    catch (e) {
      throw new EvalError(
        `Secret: constructor: Error creating Secret object: \n${e as string}`,
      );
    }
  }

  public static get Filetype(): typeof Filetype {
    try {
      return key_Filetype;
    }
    catch (e) {
      throw new ReferenceError(
        `Secret: Utility: Error importing Utility module: \n${e as string}`,
      );
    }
  }
}

module.exports = Secret;
