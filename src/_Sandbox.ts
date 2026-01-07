"deep-green play";
import Shortcut from "./app";
import _ from "./lib/contact";

const Book = new _;

await new class Sandbox extends Shortcut {
  protected async runtime() {
    const phone = await Book.phone();

    log(phone);
  }
}().run();
