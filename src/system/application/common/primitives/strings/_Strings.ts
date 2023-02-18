declare type nstring<
  Value extends string,
  Count extends number
> =
  _stringhelpers.stringlen<Value> extends Count ? Value
  : never
  ;

declare type maxstring<
  Value extends string,
  Max extends number,
  LengthCounter extends any[] = [],
  StringAccumulator extends string = ""
> =
  Max extends LengthCounter["length"] ?
  StringAccumulator
  : Value extends `${infer F}${infer R}` ?
  (
    maxstring<R, Max, [0, ...LengthCounter], `${StringAccumulator}${F}`>
  )
  : StringAccumulator
  ;


//// char
declare type char = char.char<string>;
declare namespace char {
  declare type char<S extends string> =
    S extends `${string}${string}` ?
    never
    : S;
}
declare function char<S extends string>(string: char.char<S>) {
  return string;
}

declare namespace _stringhelpers {
  type stringlen<
    Value extends string,
    Accumulator extends 0[] = [],
  > =
    Value extends `${string}${infer $Rest}` ?
    stringlen<$Rest, [...Accumulator, 0]>
    : Accumulator["length"];
}
