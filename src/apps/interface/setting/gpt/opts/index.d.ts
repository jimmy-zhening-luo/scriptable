declare type GptOpts =
  & { model: GptModel }
  & Field<Keys<GptSetting["app"]["tags"]>>
  & Scalar<Keys<GptSetting["app"]["limits"]>>
;
