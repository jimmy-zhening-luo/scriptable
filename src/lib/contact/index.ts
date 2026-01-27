import Person from "./person";

export default class ContactBook {
  public static async book() {
    return (
      await Contact.all(
        [await ContactBook.container()],
      )
    )
      .map(
        contact => new Person(contact),
      )
      .sort();
  }

  public static async phonebook() {
    return (
      await ContactBook.book()
    )
      .filter(
        person => person.hasPhone,
      );
  }

  public static async sync() {
    await Contact.persistChanges();
  }

  private static async container() {
    return ContactBook._container
      ??= await ContactsContainer.default();
  }

  private static _container?: ContactsContainer;
}
