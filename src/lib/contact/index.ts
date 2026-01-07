import type { SettableContactField } from "./field";
import Phone from "./phone";

export default class ContactBook {
  public static Phone = Phone;

  public static order(
    a: Contact,
    b: Contact,
  ) {
    return a.givenName.length === 0
      ? -1
      : b.givenName.length === 0
        ? 1
        : a.givenName.codePointAt(0)! - b.givenName.codePointAt(0)!;
  }

  public static name(contact: Contact) {
    return contact.givenName + (
      contact.familyName
        ? " " + contact.familyName
        : ""
    );
  }

  public static phone(contact: Contact) {
    return contact.phoneNumbers
      .map(number => new Phone(number));
  }

  public async book() {
    return (
      await Contact.all([await this.container()])
    ).sort(ContactBook.order);
  }

  public async phonebook() {
    return (await this.book())
      .filter(c => c.isPhoneNumbersAvailable)
      .filter(c => c.phoneNumbers.length !== 0);
  }

  public set<
    F extends SettableContactField | "phoneNumbers",
    V extends Contact[F],
  >(
    contact: Contact,
    field: F,
    value: Null<V>,
  ) {
    Contact.update(contact);

    if (value)
      contact[field] = value;
  }

  public setPhone(
    contact: Contact,
    phones: Phone[],
  ) {
    const cards = phones
      .map(phone => phone.card)
      .filter(card => card !== null);

    if (cards.length && cards.length === phones.length)
      this.set(
        contact,
        "phoneNumbers",
        cards,
      );
  }

  public async sync() {
    await Contact.persistChanges();
  }

  private async container() {
    return this._container ??= await ContactsContainer.default();
  }

  private _container?: ContactsContainer;
}
