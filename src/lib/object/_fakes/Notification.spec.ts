const FakeNotification = class FakeNotification {
  public title = "DEFAULT_FAKE_ALERT_TITLE";
  public body = "DEFAULT_FAKE_ALERT_BODY";
  public sound = "DEFAULT_FAKE_ALERT_SOUND";

  constructor() {
    this.title = "";
    this.body = "";
    this.sound = "default";
  }

  public async schedule(): Promise<void> {
    return Promise.resolve();
  }
} as unknown as typeof Notification;

export { FakeNotification };
