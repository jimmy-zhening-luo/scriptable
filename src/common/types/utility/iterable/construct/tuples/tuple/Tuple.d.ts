declare type Tuple<
  Inner,
  Length extends number,
  Head extends Inner[] = [],
> = [Inner] extends [never]
  ? never
  : Length extends Length
    ? number extends Length
      ? Inner[]
      : Head[
        "length"
      ] extends Length
        ? Head
        : Tuple<
          Inner
          ,
          Length
          ,
          [
            ...Head,
            Inner,
          ]
        >
    : never;
