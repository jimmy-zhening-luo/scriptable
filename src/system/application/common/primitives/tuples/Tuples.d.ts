declare type _BuildNTuple<
  Current extends [...Type[]],
  Type,
  Count extends number
> =
  Current["length"] extends Count ?
  Current
  : _BuildNTuple<[Type, ...Current], Type, Count>;

declare type _BuildMinTuple<
  Current extends [...Type[]],
  Type,
  Min extends number
> = Current["length"] extends Min ?
  [...Current, ...Type[]]
  : _BuildMinTuple<[Type, ...Current], Type, Min>;

declare type _BuildMinMaxTuple<
  Current extends [...(Type | undefined)[]],
  Type,
  Min extends number,
  Max extends number,
  ExceedsMin extends boolean = false
> = ExceedsMin extends false ?
  (
    Min extends Current["length"] ?
    _BuildMinMaxTuple<
      Current,
      Type,
      Min,
      Max,
      true
    >
    : _BuildMinMaxTuple<
      [...Current, Type],
      Type,
      Min,
      Max,
      false
    >
  ) : (
    Max extends Current["length"] ?
    Current
    : _BuildMinMaxTuple<
      [...Current, Type?],
      Type,
      Min,
      Max,
      true
    >
  );

declare type NTuple<Type, N extends number> = _BuildNTuple<[], Type, N>;

declare type Tuple<Type> = NTuple<Type, 2>;

declare type MinTuple<Type, Min extends number> = _BuildMinTuple<[], Type, Min>;

declare type MinMaxTuple<Type, Min extends number, Max extends number> = _BuildMinMaxTuple<[], Type, Min, Max>;

declare type MaxTuple<Type, Max extends number> = _BuildMinMaxTuple<[], Type, 0, Max>;
