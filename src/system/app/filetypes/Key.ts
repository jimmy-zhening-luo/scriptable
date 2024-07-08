const k_Filetype = importModule(
  `filetype/Filetype`,
) as typeof Filetype;

class Key<
  Class extends string,
> extends k_Filetype<
    "Key"
    ,
    Class
  > {
  constructor(
    category: literalful<
      Class
    >,
    app: stringful,
    handle: stringful,
  ) {
    try {
      super(
        "Key",
        category,
        Key
          .ReadonlyFile,
        "txt",
        app,
        handle,
      );
    }
    catch (e) {
      throw new EvalError(
        `Key: ctor`,
        { cause: e },
      );
    }
  }

  private get fullname() {
    try {
      return this
        .subpath;
    }
    catch (e) {
      throw new EvalError(
        `Key: handle`,
        { cause: e },
      );
    }
  }

  public load(
    fallbackLocal = false,
  ) {
    try {
      const { fullname } = this;

      if (
        !Keychain
          .contains(
            fullname,
          )
      )
        if (
          !fallbackLocal
        )
          throw new ReferenceError(
            `key does not exist in Keychain, and fallbackLocal is 'false'`,
            {
              cause: {
                fullname,
                inKeychain: Keychain.contains(fullname),
                fallbackLocal,
                local: super.read(),
              },
            },
          );
        else
          return super
            .readful();
      else {
        const key = Keychain
          .get(
            fullname,
          );

        if (
          key
            .length < 1
        )
          throw new ReferenceError(
            `Unexpected: key exists in Keychain but is empty`,
            {
              cause: {
                fullname,
                inKeychain: Keychain.contains(fullname),
                key,
                fallbackLocal,
                local: super.read(),
              },
            },
          );
        else
          return key as stringful;
      }
    }
    catch (e) {
      throw new EvalError(
        `Key: load`,
        { cause: e },
      );
    }
  }

  public add(
    roll = false,
  ) {
    try {
      const { fullname } = this;

      if (
        Keychain
          .contains(
            fullname,
          )
          && !roll
      )
        throw new ReferenceError(
          `cannot overwrite existing key with roll set to 'false'`,
          {
            cause: {
              fullname,
              roll,
              local: super.read(),
              inKeychain: Keychain.contains(fullname),
              keychain: Keychain.get(fullname),
            },
          },
        );
      else {
        const local = super
          .readful();

        Keychain
          .set(
            fullname,
            local,
          );

        if (
          local !== Keychain
            .get(
              fullname,
            )
        )
          throw new EvalError(
            `attempted to initialize key in Keychain, but Keychain value after setting does not match the intended value`,
            {
              cause: {
                fullname,
                roll,
                local,
                inKeychain: Keychain.contains(fullname),
                keychain: Keychain.get(fullname),
              },
            },
          );
      }
    }
    catch (e) {
      throw new EvalError(
        `Key: add`,
        { cause: e },
      );
    }
  }

  public roll() {
    try {
      this
        .add(
          true,
        );
    }
    catch (e) {
      throw new EvalError(
        `Key: roll`,
        { cause: e },
      );
    }
  }

  public remove() {
    try {
      const { fullname } = this;

      if (
        Keychain
          .contains(
            fullname,
          )
      ) {
        Keychain
          .remove(
            fullname,
          );

        if (
          Keychain
            .contains(
              fullname,
            )
        )
          throw new EvalError(
            `removed key from Keychain, but key is still in Keychain`,
            {
              cause: {
                fullname,
                inKeychain: Keychain.contains(fullname),
                keychain: Keychain.get(fullname),
                local: super.read(),
              },
            },
          );
      }
    }
    catch (e) {
      throw new EvalError(
        `Key: remove`,
        { cause: e },
      );
    }
  }

  public override read(): never {
    throw new ReferenceError(
      `Key: read: Forbidden: directly reading key from local file disallowed; use 'load(true)' instead`,
      { cause: { handle: this.fullname } },
    );
  }

  public override readful(): never {
    throw new ReferenceError(
      `Key: readful: Forbidden: directly reading key from local file disallowed; use 'load(true)' instead`,
      { cause: { handle: this.fullname } },
    );
  }

  public write(): never {
    try {
      this
        .file
        .write();
    }
    catch (e) {
      throw new EvalError(
        `Key: write`,
        { cause: e },
      );
    }
  }
}

module.exports = Key;
