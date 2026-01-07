"deep-green play";
import Shortcut from "./app";
import Contact from "./lib/contact";

await new class Sandbox extends Shortcut {
  private readonly Contact = new Contact();

  protected async runtime() {
    const phone = await this.Contact.phone();

    log(phone);
  }
}().run();
