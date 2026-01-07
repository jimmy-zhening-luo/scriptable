export default class {
  public async get() {
    return Contact.all([await this.container()]);
  }

  public async phone() {
    return (await this.get())
      .filter(c => c.isPhoneNumbersAvailable)
      .filter(c => c.phoneNumbers.length !== 0);
  }

  private async container() {
    return this._container ??= await ContactsContainer.default();
  }

  private _container?: ContactsContainer;
}
