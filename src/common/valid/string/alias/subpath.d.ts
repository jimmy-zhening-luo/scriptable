declare type subpath = typeof filepath<0>;
declare namespace subpath {
  export type instance = InstanceType<subpath>;
  export type toString = Stringify<InstanceType<subpath>>;
}
