import Person from "./person";

export default class {
  public async book() {
    return (
      await Contact.all(
        [await this.container()],
      )
    )
      .map(
        contact => new Person(contact),
      )
      .sort();
  }

  public async phonebook() {
    return (
      await this.book()
    )
      .filter(
        person => person.hasPhone,
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
