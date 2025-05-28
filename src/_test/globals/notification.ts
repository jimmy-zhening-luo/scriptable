export class Notification {
  public identifier = "MOCK_ALERT_IDENTIFIER";
  public title = "MOCK_ALERT_TITLE";
  public subtitle = "MOCK_ALERT_SUBTITLE";
  public body = "MOCK_ALERT_BODY";
  public preferredContentHeight = 1;
  public badge = 2;
  public threadIdentifier = "MOCK_ALERT_THREAD_IDENTIFIER";
  public userInfo: Record<string, unknown> = {
    key: "MOCK_ALERT_USER_INFO",

  };
  public sound = "piano_success" as const;
  public openURL = "https://example.com/MOCK_ALERT_OPEN_URL";
  public deliveryDate = new Date();
  public nextTriggerDate = new Date();
  public scriptName = "MOCK_ALERT_SCRIPT";
  public actions: {
    title: string;
    url: string;
    destructive?: boolean;
  }[] = [
    {
      title: "MOCK_ALERT_DEFAULT_ACTION",
      url: "https://example.com/MOCK_ALERT_DEFAULT_ACTION",
    },
  ];

  public static async allPending() {
    return Promise.resolve([new Notification()]);
  }

  public static async allDelivered() {
    return Promise.resolve([new Notification()]);
  }

  public static async removeAllPending() {
    return Promise.resolve();
  }

  public static async removeAllDelivered() {
    return Promise.resolve();
  }

  public static async removePending(identifiers: readonly string[]) {
    console.log(`Mock removePending called with identifiers: ${identifiers.join(", ")}`);

    return Promise.resolve();
  }

  public static async removeDelivered(identifiers: readonly string[]) {
    console.log(`Mock removeDelivered called with identifiers: ${identifiers.join(", ")}`);

    return Promise.resolve();
  }

  public static resetCurrent() {
    console.log("Mock resetCurrent called");
  }

  public async schedule() {
    return Promise.resolve();
  }

  public async remove() {
    console.log(`Mock remove called on self with identifier: ${this.identifier}`);

    return Promise.resolve();
  }

  public setTriggerDate(date: Date) {
    this.nextTriggerDate = date;
    console.log(`Mock setTriggerDate called with date: ${date.toISOString()}`);
  }

  public setDailyTrigger(hour: number, minute: number, repeats = false) {
    console.log(`Mock setDailyTrigger called with hour: ${hour}, minute: ${minute}, repeats: ${repeats}`);
  }

  public setWeeklyTrigger(weekday: number, hour: number, minute: number, repeats = false) {
    console.log(`Mock setWeeklyTrigger called with weekday: ${weekday}, hour: ${hour}, minute: ${minute}, repeats: ${repeats}`);
  }

  public addAction(title: string, url: string, destructive = false) {
    this.actions.push(
      {
        title,
        url,
        destructive,
      },
    );
    console.log(`Mock addAction called with title: ${title}, url: ${url}, destructive: ${destructive}`);
  }
}
