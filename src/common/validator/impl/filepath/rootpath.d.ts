declare type rootpath = typeof filepath<1>;
declare namespace rootpath {
  export type instance = InstanceType<rootpath>;
  export type toString = Stringify<InstanceType<rootpath>>;
}
