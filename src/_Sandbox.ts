"deep-green play";
import Shortcut from "./app";
import Book from "./lib/contact";

await new class Sandbox extends Shortcut {
  protected async runtime() {
    const book = new Book,
    phonebook = await book.phonebook();

    for (const contact of phonebook) {
      const card = Book.phone(contact);

      log(Book.name(contact) + ": " + card.length);
    }
  }
}().run();
