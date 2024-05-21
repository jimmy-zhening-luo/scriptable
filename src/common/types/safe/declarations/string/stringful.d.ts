declare type stringful =
  & Safe<
    string,
    "stringful"
  >
  & {
    0: stringful & { length: 1 };
  }
;
