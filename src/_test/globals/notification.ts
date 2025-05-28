const MockNotification = class Notification {
  public title = "MOCK_ALERT_TITLE";
  public body = "MOCK_ALERT_BODY";
  public sound = "MOCK_ALERT_SOUND";

  constructor() {
    this.title = "";
    this.body = "";
    this.sound = "default";
  }

  public async schedule(): Promise<void> {
    return Promise.resolve();
  }
} as typeof Notification;

export { MockNotification };
