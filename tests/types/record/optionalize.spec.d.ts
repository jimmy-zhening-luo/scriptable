declare namespace Optional {
  export type Result = 0 | Test<{
    T: [
      a: AB_C,
      b: "A" & keyof AB_C,
      b0: "B" & keyof AB_C,
      b1: "C" & keyof AB_C,
      c: {
        A: number;
        B: number;
      } extends AB_C ? true : never,
      d: ABC extends AB_C ? true : never,
      d0: {
        A: number;
        B: number;
        C: number;
      } extends AB_C ? true : never,
      d1: {
        A: number;
        B: number;
        C: number;
        D: number;
      } extends AB_C ? true : never,
      d2: {
        A: number;
        B: number;
        D: number;
      } extends AB_C ? true : never,
    ];
    F: [
      "D" & keyof AB_C,
      c: {
        A: number;
      } extends AB_C ? true : never,
      c0: {
        A: number;
        C: number;
      } extends AB_C ? true : never,
      c1: {
        B: number;
        C: number;
      } extends AB_C ? true : never,
      d: {
        B: number;
        C: number;
        D: number;
      } extends AB_C ? true : never,
    ];
  }>;
  export type AB_C = Optional<ABC, "C">;
  export type ABC = Record<
    (
      | "A"
      | "B"
      | "C"
    ),
    number
  >;
}
