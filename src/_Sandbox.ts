"deep-green play";
import Shortcut from "./app";
import Book from "./lib/contact";

await new class Sandbox extends Shortcut {
  protected async runtime() {
    const book = new Book,
    phone = await book.phonebook();

    log(phone);
  }
}().run();
