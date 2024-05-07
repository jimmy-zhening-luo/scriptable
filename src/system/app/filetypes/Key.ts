const k_Filetype: typeof Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Key<Class extends string> extends k_Filetype<
  Class,
  "Key",
  ReadOnlyFile
> {
  constructor(
    appClass: literalful<Class>,
    app: stringful,
    alias: string,
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

  private get handle(): stringful {
    try {
      return this.subpath;
    }
    catch (e) {
      throw new EvalError(
        `Key: handle`,
        { cause: e },
      );
    }
  }

  public load(fallbackLocal: boolean = false): stringful {
    try {
      const handle: stringful = this.handle;

      if (!Keychain.contains(handle))
        if (!fallbackLocal)
          throw new ReferenceError(
            `key does not exist in Keychain, and fallbackLocal is 'false'`,
            {
              cause: {
                handle,
                inKeychain: Keychain.contains(handle),
                fallbackLocal,
                local: this.read(),
              },
            },
          );
        else
          return this.readful();
      else {
        const key: string = Keychain.get(handle);

        if(key.length === 0)
          throw new ReferenceError(
            `Unexpected: key exists in Keychain but is empty`,
            {
              cause: {
                handle,
                inKeychain: Keychain.contains(handle),
                key,
                fallbackLocal,
                local: this.read(),
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

  public add(roll: boolean = false): this {
    try {
      const handle: stringful = this.handle;

      if (Keychain.contains(handle) && !roll)
        throw new ReferenceError(
          `cannot overwrite existing key with roll set to 'false'`,
          {
            cause: {
              handle,
              roll,
              local: this.read(),
              inKeychain: Keychain.contains(handle),
              keychain: Keychain.get(handle),
            },
          },
        );
      else {
        const local: stringful = this.readful();

        Keychain.set(
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
                intendedValue: keyful,
                actualKeychainValue: Keychain.get(handle),
              },
            },
          );
        else
          return keyful;
      }
    }
    catch (e) {
      throw new EvalError(
        `Key: add`,
        { cause: e },
      );
    }
  }

  public roll(): this {
    try {
      return this.add(true);
    }
    catch (e) {
      throw new EvalError(
        `Key: roll`,
        { cause: e },
      );
    }
  }

  public remove(): this {
    try {
      const handle: stringful = this.handle;

      if (Keychain.contains(handle)) {
        Keychain.remove(handle);

        if (Keychain.contains(handle))
          throw new EvalError(
            `removed key from Keychain, but key is still in Keychain`,
            {
              cause: {
                handle,
                inKeychain: Keychain.contains(handle),
                keychain: Keychain.get(handle),
                local: this.read(),
              },
            },
          );
      }

      return this;
    }
    catch (e) {
      throw new EvalError(
        `Key: remove`,
        { cause: e },
      );
    }
  }

  public write(): never {
    throw new ReferenceError(
      `Key: write: Forbidden: Local key files are readonly`,
      { cause: { handle: this.handle } },
    );
  }
}

module.exports = Key;
