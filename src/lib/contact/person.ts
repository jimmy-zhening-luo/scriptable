import PhoneNumber from "./phone";
import type { SettableContactField } from "./field";

export default class Person {
  private _modified = false;

  constructor(private readonly contact: Contact) {}

  public get modified() {
    return this._modified;
  }

  public get name() {
    return this._name ??= this.getName();
  }

  public get hasPhone() {
    return this.contact.isPhoneNumbersAvailable
      && this.contact.phoneNumbers.length !== 0;
  }

  public get phones() {
    return this._phones ??= (
      this.hasPhone
        ? this
          .contact
          .phoneNumbers
          .map(
            phone => new PhoneNumber(phone),
          )
        : []
    );
  }

  public set phones(
    phones: PhoneNumber[],
  ) {
    const modified = phones
      .filter(phone => phone.modified);

    if (modified.length) {
      const cards = phones
        .map(phone => phone.card)
        .filter(card => card !== null);

      if (phones.length === cards.length)
        this._set(
          "phoneNumbers",
          cards,
        );
    }
  }

  public set<
    K extends SettableContactField,
    V extends Contact[K],
  >(
    field: K,
    value: Null<V>,
  ) {
    this._set(
      field,
      value,
    );
  }

  public [Symbol.toPrimitive]() {
    return this.name;
  }

  public toString() {
    return this.name;
  }

  private getName() {
    const {
      givenName,
      familyName,
    } = this.contact;

    return givenName
      ? familyName
        ? givenName
          + " "
          + familyName
        : givenName
      : familyName;
  }

  private _set<
    K extends SettableContactField | "phoneNumbers",
    V extends Contact[K],
  >(
    field: K,
    value: Null<V>,
  ) {
    if (value) {
      if (!this._modified) {
        Contact.update(
          this.contact,
        );

        this._modified = true;
      }

      this.contact[field] = value;
    }
  }

  private _name?: string;

  private _phones?: PhoneNumber[];
}
