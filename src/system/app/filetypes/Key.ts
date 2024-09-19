import type { Filetype } from "./filetype/index";

const kFiletype = importModule<typeof Filetype>("./filetype/index");

class Key<AT extends string> extends kFiletype<"Key", AT, true> {
  constructor(
    apptype: literalful<AT>,
    app: stringful,
    handle: stringful,
  ) {
    super(
      "Key",
      apptype,
      true,
      handle,
      null,
      app,
    );
  }

  private get address() {
    return this.subpath;
  }

  public load(roll = false) {
    const { address } = this;

    return roll || !Keychain.contains(address) ? this.roll() : Keychain.get(address);
  }

  public roll(): string {
    try {
      const local = super.readful();

      Keychain.set(this.address, local);

      const keychain = Keychain.get(this.address);

      if (local !== keychain)
        throw new EvalError("Fatal: Key set in Keychain mismatches local", { cause: { local, keychain } });

      this.delete();

      return keychain;
    }
    catch (e) {
      throw new Error(`Key: roll (${this.name})`, { cause: e });
    }
  }

  public purge() {
    try {
      const { address } = this;

      if (Keychain.contains(address)) {
        Keychain.remove(address);

        if (Keychain.contains(address))
          throw new EvalError("Fatal: Removed key is still in Keychain");
      }
    }
    catch (e) {
      throw new Error(`Key: purge (${this.name})`, { cause: e });
    }
  }

  public override read(): never {
    throw new ReferenceError("Key: read forbidden");
  }

  public override readful(): never {
    throw new ReferenceError("Key: readful forbidden");
  }

  protected write(): never {
    throw new ReferenceError("Key: write forbidden");
  }

  protected delete(): void {
    this.file.delete();
  }
}

module.exports = Key;
export type { Key };
