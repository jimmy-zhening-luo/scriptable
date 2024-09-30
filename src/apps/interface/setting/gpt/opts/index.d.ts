declare type GptOpts =
  & Field<
    | "model"
    | Keys<GptSetting["app"]["tags"]>
  >
  & Scalar<Keys<GptSetting["app"]["limits"]>>
;
