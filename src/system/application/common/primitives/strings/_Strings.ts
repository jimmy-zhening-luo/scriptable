
declare type minmaxstring<
  Min,
  Max
> = string & {
  readonly minmaxstring: unique symbol
};



declare type maxstring<
  String extends string,
  Max extends number,
  LengthCounter extends any[] = [],
  StringAccumulator extends string = ""> =
  Max extends LengthCounter["length"] ?
  StringAccumulator
  : String extends `${infer F}${infer R}` ?
  (
    maxstring<R, Max, [0, ...LengthCounter], `${StringAccumulator}${F}`>
  )
  : StringAccumulator;

const bogus = "";

const nstringTest: maxstring<typeof bogus, 5> = bogus;



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
