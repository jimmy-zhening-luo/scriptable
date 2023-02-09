namespace Types {
  export type primitive = string | number | boolean;

  export type stringful = Exclude<string, "">;
}
