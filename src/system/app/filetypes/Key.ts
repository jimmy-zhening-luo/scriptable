const k_Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Key<
  Class extends string,
> extends k_Filetype<
    Class,
    "Key",
    ReadOnlyFile
  > {
  constructor(
    appClass: literalful<Class>,
    app: stringful,
    alias: stringful,
  ) {
    try {
      super(
        Key.ReadOnlyFile,
        "Key",
        appClass,
        app,
        alias,
      );
    }
    catch (e) {
      throw new EvalError(
        `Key: ctor`,
        { cause: e },
      );
    }
  }

  private get handle() {
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
      const { handle } = this;

      if (!Keychain.contains(handle))
        if (!fallbackLocal)
          throw new ReferenceError(
            `key does not exist in Keychain, and fallbackLocal is 'false'`,
            {
              cause: {
                handle,
                inKeychain: Keychain.contains(handle),
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
            handle,
          );

        if (key.length < 1)
          throw new ReferenceError(
            `Unexpected: key exists in Keychain but is empty`,
            {
              cause: {
                handle,
                inKeychain: Keychain.contains(handle),
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
      const { handle } = this;

      if (Keychain.contains(handle) && !roll)
        throw new ReferenceError(
          `cannot overwrite existing key with roll set to 'false'`,
          {
            cause: {
              handle,
              roll,
              local: super.read(),
              inKeychain: Keychain.contains(handle),
              keychain: Keychain.get(handle),
            },
          },
        );
      else {
        const local = super
          .readful();

        Keychain
          .set(
            handle,
            local,
          );

        if (local !== Keychain.get(handle))
          throw new EvalError(
            `attempted to initialize key in Keychain, but Keychain value after setting does not match the intended value`,
            {
              cause: {
                handle,
                roll,
                local,
                inKeychain: Keychain.contains(handle),
                keychain: Keychain.get(handle),
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
      const { handle } = this;

      if (Keychain.contains(handle)) {
        Keychain
          .remove(
            handle,
          );

        if (Keychain.contains(handle))
          throw new EvalError(
            `removed key from Keychain, but key is still in Keychain`,
            {
              cause: {
                handle,
                inKeychain: Keychain.contains(handle),
                keychain: Keychain.get(handle),
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
      { cause: { handle: this.handle } },
    );
  }

  public override readful(): never {
    throw new ReferenceError(
      `Key: readful: Forbidden: directly reading key from local file disallowed; use 'load(true)' instead`,
      { cause: { handle: this.handle } },
    );
  }

  public write(): never {
    throw new ReferenceError(
      `Key: write: Forbidden: Local key files are readonly`,
      { cause: { handle: this.handle } },
    );
  }

  public delete(): never {
    throw new ReferenceError(
      `Key: delete: Forbidden: Local key files are readonly`,
      { cause: { handle: this.handle } },
    );
  }
}

module.exports = Key;
