declare type GptOpts =
  & Field<
    Keys<
      GptSetting["app"]["tags"]
    >
  >
  & Scalar<
    Keys<
      GptSetting["app"]["limit"]
    >
  >
  & Record<
    "model",
    GptModel
  >
;
