declare type StringLength<Length extends number> = LengthValue<Length> extends never
  ? never
  : { length: LengthValue<Length> };
