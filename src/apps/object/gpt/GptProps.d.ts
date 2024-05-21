declare type GptProps =
  & Record<
    Keys<
      GptSetting["app"]["tags"]
    >,
    string
  >
  & Record<
    "model",
    Keys<
      GptSetting["app"]["models"]
    >
  >
  & Record<
    Keys<
      GptSetting["app"]["limit"]
    >,
    number
  >
;
