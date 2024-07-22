const kFiletype = importModule<typeof Filetype>(
  `filetype/Filetype`,
);

class Key<Class extends string> extends kFiletype<"Key", Class> {
  constructor(
    category: literalful<Class>,
    app: stringful,
    handle: stringful,
  ) {
    super(
      "Key",
      category,
      Key.ReadonlyFile,
      `txt`,
      app,
      handle,
    );
  }

  private get fullname() {
    return this.subpath;
  }

  public load(fallback = false) {
    try {
      const { fullname } = this;

      if (!Keychain.contains(fullname))
        if (!fallback)
          throw new ReferenceError(
            `No such key in Keychain, fallback:false`,
            {
              cause: {
                fullname,
                inKeychain: Keychain.contains(fullname),
                fallback,
                local: super.read(),
              },
            },
          );
        else
          return super.readful();
      else {
        const key = Keychain.get(fullname);

        if (key.length < 1)
          throw new ReferenceError(
            `Unexpected: Key exists in Keychain but is empty string`,
            {
              cause: {
                fullname,
                inKeychain: Keychain.contains(fullname),
                key,
                fallback,
                local: super.read(),
              },
            },
          );
        else
          return key as stringful;
      }
    }
    catch (e) {
      throw new Error(
        `Key: load`,
        { cause: e },
      );
    }
  }

  public add(roll = false) {
    try {
      const { fullname } = this;

      if (Keychain.contains(fullname) && !roll)
        throw new ReferenceError(
          `Tried to overwrite existing key with roll:false`,
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
        const local = super.readful();

        Keychain.set(
          fullname,
          local,
        );

        if (local !== Keychain.get(fullname))
          throw new ReferenceError(
            `Created key in Keychain, but resulting key has wrong value`,
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
      throw new Error(
        `Key: add`,
        { cause: e },
      );
    }
  }

  public roll() {
    this.add(true);
  }

  public remove() {
    try {
      const { fullname } = this;

      if (Keychain.contains(fullname)) {
        Keychain.remove(fullname);

        if (Keychain.contains(fullname))
          throw new ReferenceError(
            `Removed key is still in Keychain`,
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
      throw new Error(
        `Key: remove`,
        { cause: e },
      );
    }
  }

  public override read(): never {
    throw new ReferenceError(
      `Key: read forbidden`,
      { cause: "Use load() instead" },
    );
  }

  public override readful(): never {
    throw new ReferenceError(
      `Key: readful forbidden`,
      { cause: `Use load(true) instead` },
    );
  }

  public write(): never {
    this.file.write();
  }
}

module.exports = Key;
