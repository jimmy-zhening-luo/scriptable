declare type Optionalize<R extends object, OK extends keyof R> = {
  readonly [K in Exclude<keyof R, OK>]: R[K];
}
& {
  readonly [K in OK]?: R[K];
};
