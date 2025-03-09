export { SyntheticFileManager } from "./app/file/index.synthetic.spec";

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
} as typeof Notification,
syntheticArgs = {
  plainTexts: ["SYNTHETIC_INPUT_PLAINTEXT_0", "SYNTHETIC_INPUT_PLAINTEXT_1"],
  urls: ["SYNTHETIC_INPUT_URL_0", "SYNTHETIC_INPUT_URL_1"],
  fileURLs: ["SYNTHETIC_INPUT_FILEURL_0", "SYNTHETIC_INPUT_FILEURL_1"],
  shortcutParameter: { fake: "SYNTHETIC_INPUT_SHORTCUTPARAMETER_INNER" },
} as unknown as typeof args;

export {
  SyntheticNotification,
  syntheticArgs,
};
