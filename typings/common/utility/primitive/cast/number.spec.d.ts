declare namespace ToNumber {
  export type OK = Tester<TF> | 0;
  export type TF = {
    T: {
      T0: ToNumber<"0">;
      T0a: ToNumber<"-0">;
      T1: ToNumber<"0" | "-0">;
      T2: ToNumber<"0" | "1">;
      T2a: ToNumber<"-0" | "1">;
      T2d: ToNumber<"0" | "-1">;
      T2e: ToNumber<"-0" | "-1">;
      T3: ToNumber<"1">;
      T3a: ToNumber<"-1">;
      T4: ToNumber<"0.1">;
      T4b: ToNumber<"-0.1">;
      T6: ToNumber<"5" | "9">;
      T6a: ToNumber<"5" | "-9">;
      T6b: ToNumber<"5" | "0.9">;
      T6c: ToNumber<"5" | "-0.9">;
      Tn: ToNumber<`1${1 | 2 | 3 | 4}`>;
      Tna: ToNumber<`-1${1 | 2 | 3 | 4}`>;
      Tnb: ToNumber<`1${1 | 2 | 3 | 4}` | `-1${1 | 2 | 3 | 4}`>;
      Tnc: ToNumber<"-0" | `1${1 | 2 | 3 | 4}` | `-1${1 | 2 | 3 | 4}`>;
    };
    F: {
      F0: ToNumber<string>;
      F1: ToNumber<"">;
      F2: ToNumber<"NaN">;
      F2a: ToNumber<"Infinity">;
      F2b: ToNumber<"-Infinity">;
      F3: ToNumber<"0.0">;
      F3a: ToNumber<"-0.0">;
      F3d: ToNumber<"1.0">;
      F3e: ToNumber<"-1.0">;
      F4: ToNumber<"0.0" | "-0">;
      F4a: ToNumber<"-0.0" | "-0">;
      F4b: ToNumber<"-0.0" | "0">;
      F4c: ToNumber<"0.0" | "-1">;
      F4d: ToNumber<"-0.0" | "-1">;
      F4e: ToNumber<"0.0" | "1">;
      F4f: ToNumber<"-0.0" | "1">;
      F4g: ToNumber<"0" | "-1.0">;
      F4h: ToNumber<"-0" | "-1.0">;
      F4i: ToNumber<"0.0" | "-1.0">;
      F4j: ToNumber<"-0.0" | "-1.0">;
      F5: ToNumber<".1">;
      F5a: ToNumber<"-.1">;
      F6: ToNumber<"" | "0">;
      F6a: ToNumber<"" | "1">;
      F6b: ToNumber<"1" | ".9">;
      F6c: ToNumber<"5" | ".9">;
      F6d: ToNumber<"5" | "-.9">;
      Fn: ToNumber<`1${number}`>;
      Fna: ToNumber<`-1${number}`>;
    };
  };
}
