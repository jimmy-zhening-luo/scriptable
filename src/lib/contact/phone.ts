export default class {
  private _value: Null<stringful> = null;

  constructor(phone: Contact.PhoneNumbers) {
    this.value = phone.value;

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
    return this.value
      ? {
          value: this.value,
          ...this.identifier
            ? { identifier: this.identifier }
            : {},
          ...this.label ?? {},
        }
      : null;
  }

  public get value(): Null<stringful> {
    return this._value;
  }

  public set value(value: Null<string>) {
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
