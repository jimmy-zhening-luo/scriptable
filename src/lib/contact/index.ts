import type { SettableContactField } from "./field";
import Phone from "./phone";

export default class {
  public static Phone = Phone;

  public static name(contact: Contact) {
    return contact.givenName + (
      contact.familyName
        ? " " + contact.familyName
        : ""
    );
  }

  public async get() {
    return Contact.all([await this.container()]);
  }

  public set(
    contact: Contact,
    field: SettableContactField,
    value: Null<string>,
  ) {
    Contact.update(contact);

    if (value)
      contact[field] = value;
  }

  public async phone() {
    return (await this.get())
      .filter(c => c.isPhoneNumbersAvailable)
      .filter(c => c.phoneNumbers.length !== 0);
  }

  public async sync() {
    await Contact.persistChanges();
  }

  private async container() {
    return this._container ??= await ContactsContainer.default();
  }

  private _container?: ContactsContainer;
}
