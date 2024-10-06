import type { Filetype } from "./filetype";

const kFiletype = importModule<typeof Filetype>("./filetype");

class Key<T extends string> extends kFiletype<"Key", T, true> {
  constructor(
    type: literalful<T>,
    app: stringful,
    handle: string,
  ) {
    super(
      true,
      "Key",
      type,
      app,
      handle,
    );
  }

  public load(roll = false) {
    const { name } = this;

    return roll || !Keychain.contains(name)
      ? this.roll()
      : Keychain.get(name);
  }

  public roll(): string {
    const local = super.readful(),
    { name } = this;

    Keychain.set(name, local);

    const keychain = Keychain.get(name);

    if (local !== keychain)
      throw new EvalError("Failed to set keychain key", { cause: name });

    this.delete();

    return keychain;
  }

  public purge() {
    const { name } = this;

    if (Keychain.contains(name)) {
      Keychain.remove(name);

      if (Keychain.contains(name))
        throw new EvalError("Failed to remove keychain key", { cause: name });
    }
  }

  protected override delete(): void {
    this.file.delete();
  }
}

module.exports = Key;
export type { Key };
