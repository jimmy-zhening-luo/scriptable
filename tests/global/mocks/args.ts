import { Notification } from "./notification";

export const args = {
  plainTexts: [
    "MOCK_INPUT_PLAINTEXT_0",
    "MOCK_INPUT_PLAINTEXT_1",
  ],
  urls: [
    "MOCK_INPUT_URL_0",
    "MOCK_INPUT_URL_1",
  ],
  fileURLs: [
    "MOCK_INPUT_FILEURL_0",
    "MOCK_INPUT_FILEURL_1",
  ],
  images: [
    "MOCK_INPUT_IMAGE_0" as unknown as Image,
    "MOCK_INPUT_IMAGE_1" as unknown as Image,
  ],
  queryParameters: {
    a: "MOCK_INPUT_QUERY_PARAMETER_VALUE_A",
    b: "MOCK_INPUT_QUERY_PARAMETER_VALUE_B",
  },
  shortcutParameter: {
    inner: "MOCK_INPUT_SHORTCUTPARAMETER_INNER",
  },
  widgetParameter: "MOCK_INPUT_WIDGETPARAMETER",
  notification: new Notification(),
};
