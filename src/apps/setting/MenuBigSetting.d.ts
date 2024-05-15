declare type MenuBigSetting = {
  app:
    & Record<"max" | "bar", number>
    & Record<"omit", "top" | "bottom">
  ;
};
