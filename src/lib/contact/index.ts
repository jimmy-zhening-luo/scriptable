export default class {
  public async get() {
    void (this.container ??= await ContactsContainer.default());

    return Contact.all([this.container]);
  }

  public async phone() {
    return (await this.get())
      .filter(c => c.isPhoneNumbersAvailable)
      .filter(c => c.phoneNumbers.length !== 0);
  }

  private container?: ContactsContainer;
}
