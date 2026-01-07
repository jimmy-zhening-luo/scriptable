export default class {
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

  private set(value?: Null<string>) {
    this._value = value
      ? value as stringful
      : null;
  }

  private readonly identifier?: string;
  private readonly label?: {
    label: stringful;
    localizedLabel?: stringful;
  };
}
