namespace Types {
  export type primitive = string | number | boolean;

  export type stringful = Exclude<string, "">;

  export type numberful = Exclude<number, "NaN">;
}
