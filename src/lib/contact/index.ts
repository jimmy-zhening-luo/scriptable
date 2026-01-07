export default class {
  public async contacts() {
    void (this.container ??= await ContactsContainer.default());

    return await Contact.all([this.container]);
  }

  private container?: ContactsContainer;
}
