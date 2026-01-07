export default class Phone {
  private _modified = false;
  private _value: Null<stringful> = null;

  constructor(private readonly phone: Contact.PhoneNumbers) {
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

  public get value(): Null<stringful> {
    return this._value;
  }

  public set value(value: Null<string>) {
    this.set(value);
    this._modified = true;
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

  private set(value?: Null<string>) {
    this._value = Phone.clean(value);
  }

  private readonly identifier?: string;
  private readonly label?: {
    label: stringful;
    localizedLabel?: stringful;
  };
}
