const SyntheticNotification = class SyntheticNotification {
  public title = "SYNTHETIC_ALERT_TITLE";
  public body = "SYNTHETIC_ALERT_BODY";
  public sound = "SYNTHETIC_ALERT_SOUND";

  constructor() {
    this.title = "";
    this.body = "";
    this.sound = "default";
  }

  public async schedule(): Promise<void> {
    return Promise.resolve();
  }
} as typeof Notification;

export { SyntheticNotification };
