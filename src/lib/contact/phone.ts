export default class PhoneNumber {
  private _modified = false;
  private _value: Null<stringful> = null;

  constructor(
    private readonly phone: Contact.PhoneNumbers,
  ) {
    this.set(phone.value);

    if (this.value) {
      if (phone.identifier)
        this.identifier = phone.identifier;

      if (phone.label)
        this.label = {
          label: phone.label as stringful,
          ...phone.localizedLabel
            ? { localizedLabel: phone.localizedLabel as stringful }
            : {},
        };
    }
  }

  public get modified() {
    return this._modified;
  }

  public get card() {
    return this._modified
      ? this.value
        ? {
            value: this.value,
            ...this.identifier
              ? { identifier: this.identifier }
              : {},
            ...this.label ?? {},
          }
        : null
      : this.phone;
  }

  public get rawValue() {
    return this.phone.value;
  }

  public get value(): Null<stringful> {
    return this._value;
  }

  public set value(value: Null<string>) {
    this.set(
      value,
      true,
    );
  }

  public static clean(number?: Null<string>) {
    return number
      ?.trim()
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("-", "")
      .replaceAll(".", "")
      .replaceAll(" ", "") as stringful
      || null;
  }

  private set(
    value?: Null<string>,
    modified?: boolean,
  ) {
    this._value = PhoneNumber.clean(value);

    if (modified)
      this._modified = true;
  }

  private readonly identifier?: string;
  private readonly label?: {
    label: stringful;
    localizedLabel?: stringful;
  };
}
