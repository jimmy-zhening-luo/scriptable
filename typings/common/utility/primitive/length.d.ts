declare type LengthValue<N extends number> = [N] extends [number]
  ? [number] extends [N]
      ? 0
      : Numeric<N>
  : never;
