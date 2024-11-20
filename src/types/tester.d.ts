declare type Tester<TF extends { T: unknown; F?: unknown }> =
& (OmitNever<TF["T"]> extends TF["T"] ? true : never)
& (object extends OmitNever<TF["F"]> ? true : undefined extends OmitNever<TF["F"]> ? true : never);
declare type OmitNever<R> = { [
  K in keyof R as R[K] extends never
    ? never
    : K
  ]: R[K] };
