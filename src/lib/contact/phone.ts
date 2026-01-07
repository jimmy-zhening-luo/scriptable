export default class {
  public readonly value: Null<stringful>;

  constructor(
    phone: Contact.PhoneNumbers,
  ) {
    this.value = (phone.value || null) as Null<stringful>;

    if (this.value) {
      this.identifier = phone.identifier!;

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
    return this.value && {
      value: this.value,
      identifier: this.identifier!,
      ...this.label ?? {},
    };
  }

  private readonly identifier?: string;
  private readonly label?: {
    label: stringful;
    localizedLabel?: stringful;
  };
}
