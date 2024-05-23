declare type GptProps =
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
    Keys<
      GptSetting["app"]["models"]
    >
  >
;
