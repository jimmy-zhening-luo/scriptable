const fakeArgs = {

  plainTexts: ["FAKE_ARGS_PLAIN_TEXT_INDEX_0", "FAKE_ARGS_PLAIN_TEXT_INDEX_1"],

  urls: ["FAKE_ARGS_URL_INDEX_0", "FAKE_ARGS_URL_INDEX_1"],

  fileURLs: ["FAKE_ARGS_FILE_INDEX_0", "FAKE_ARGS_FILE_INDEX_1"],

  shortcutParameter: {
    fake: "FAKE_ARGS_SHORTCUT_PARAMETER['fake']",
    wow: "FAKE_ARGS_SHORTCUT_PARAMETER['wow']",
  },
} as unknown as typeof args;

export { fakeArgs };
