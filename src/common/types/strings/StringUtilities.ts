
declare type char<
  Value extends string
> =
  nstring<
    Value,
    1
  >
  ;

declare type charless<
  Value extends string,
  Char extends string
> =
  Value extends `${string}${char<Char>}${string}` ?
  never
  : Value
  ;

declare type stringful<
  Value extends string
> =
  Value extends "" ?
  never
  : Value
  ;

function stringful<Value extends string>(
  string: Value extends stringful<Value> ? Value : never
): Value {
  return string;
}

declare type dotless<
  Value extends string
> =
  charless<
    Value,
    "."
  >
  ;

declare type slashless<
  Value extends string
> =
  charless<
    Value,
    "/"
  >
  ;

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
    maxstring<
      R,
      Max,
      [
        0,
        ...LengthCounter
      ],
      `${StringAccumulator}${F}`
    >
  )
  : StringAccumulator
  ;

declare namespace _stringhelpers {

  type stringlen<
    Value extends string,
    Accumulator extends 0[] = [],
  > =
    Value extends `${string}${infer $Rest}` ?
    stringlen<
      $Rest,
      [
        ...Accumulator,
        0
      ]
    >
    : Accumulator["length"]
    ;

}
