declare type GptOpts =
  & Field<keyof GptSetting["app"]["tags"]>
  & Scalar<keyof GptSetting["app"]["limit"]>
  & Record<"model", GptModel>
;
