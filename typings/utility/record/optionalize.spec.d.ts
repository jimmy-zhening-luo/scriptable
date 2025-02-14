declare namespace Optionalize {
  export type Result = 0 | Test<{
    T: [
      a: AB_C,
      b: "A" & keyof AB_C,
      b0: "B" & keyof AB_C,
      b1: "C" & keyof AB_C,
      c: {
        readonly A: number;
        readonly B: number;
      } extends AB_C ? true : never,
      d: ABC extends AB_C ? true : never,
      d0: {
        readonly A: number;
        readonly B: number;
        readonly C: number;
      } extends AB_C ? true : never,
      d1: {
        readonly A: number;
        readonly B: number;
        readonly C: number;
        readonly D: number;
      } extends AB_C ? true : never,
      d2: {
        readonly A: number;
        readonly B: number;
        readonly D: number;
      } extends AB_C ? true : never,
    ];
    F: [
      "D" & keyof AB_C,
      c: {
        readonly A: number;
      } extends AB_C ? true : never,
      c0: {
        readonly A: number;
        readonly C: number;
      } extends AB_C ? true : never,
      c1: {
        readonly B: number;
        readonly C: number;
      } extends AB_C ? true : never,
      d: {
        readonly B: number;
        readonly C: number;
        readonly D: number;
      } extends AB_C ? true : never,
    ];
  }>;
  export type AB_C = Optionalize<ABC, "C">;
  export type ABC = Record<
    (
      | "A"
      | "B"
      | "C"
    ),
    number
  >;
}
