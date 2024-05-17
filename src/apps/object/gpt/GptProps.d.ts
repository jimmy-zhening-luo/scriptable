declare type GptProps =
  & Record<
    keyof GptSetting["app"]["tags"],
    string
  >
  & Record<
    "model",
    keyof GptSetting["app"]["models"]
  >
  & Record<
    keyof GptSetting["app"]["limit"],
    number
  >
;
