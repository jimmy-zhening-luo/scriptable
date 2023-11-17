declare type Tuple<Type> = NTuple<Type, 2>;

declare type NTuple<Type, N extends number> = _tuplehelpers.BuildNTuple<
  [],
  Type,
  N
>;

declare type MinTuple<Type, Min extends number> = _tuplehelpers.BuildMinTuple<
  [],
  Type,
  Min
>;

declare type MaxTuple<
  Type,
  Max extends number,
> = _tuplehelpers.BuildMinMaxTuple<[], Type, 0, Max>;

declare type MinMaxTuple<
  Type,
  Min extends number,
  Max extends number,
> = _tuplehelpers.BuildMinMaxTuple<[], Type, Min, Max>;

declare namespace _tuplehelpers {
  type BuildNTuple<
    Current extends [...Type[]],
    Type,
    Count extends number,
  > = Current["length"] extends Count
    ? Current
    : BuildNTuple<[Type, ...Current], Type, Count>;

  type BuildMinTuple<
    Current extends [...Type[]],
    Type,
    Min extends number,
  > = Current["length"] extends Min
    ? [...Current, ...Type[]]
    : BuildMinTuple<[Type, ...Current], Type, Min>;

  type BuildMinMaxTuple<
    Current extends [...(Type | undefined)[]],
    Type,
    Min extends number,
    Max extends number,
    ExceedsMin extends boolean = false,
  > = ExceedsMin extends false
    ? Min extends Current["length"]
      ? BuildMinMaxTuple<Current, Type, Min, Max, true>
      : BuildMinMaxTuple<[...Current, Type], Type, Min, Max>
    : Max extends Current["length"]
      ? Current
      : BuildMinMaxTuple<[...Current, Type?], Type, Min, Max, true>;
}
