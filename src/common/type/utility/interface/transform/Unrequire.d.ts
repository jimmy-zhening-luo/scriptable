declare type Unrequire<R extends object, OK extends string> = Interface<R> extends never
  ? never
  : literalful<OK> extends never
    ? never
    : OK extends keyof R
      ? Omit<Interface<R>, literalful<OK>> & Partial<Pick<Interface<R>, literalful<OK>>>
      : never;

declare namespace Unrequire {
  export type T = Unrequire<{
    a: 1;
    b: 1;
    c: 1;
  }, "c">;
  export type T1c = "a" extends keyof T ? true : false; // true
  export type T1b = "b" extends keyof T ? true : false; // true
  export type T1 = "c" extends keyof T ? true : false; // true
  export type T2 = {
    a: 1;
    b: 1;
  } extends T ? true : false; // true
  export type T2b = {
    a: 1;
    b: 1;
    c: 1;
  } extends T ? true : false; // true
  export type T2c = {
    a: 1;
    b: 1;
    c: 1;
    z: 9001;
  } extends T ? true : false; // true
}

declare namespace NotUnrequire {
  export type N_null = {
    a: 1;
    b: 1;
    c: 1;
  } extends Unrequire.T ? true : false; // true
  export type N = {
    b: 1;
    c: 1;
  } extends Unrequire.T ? true : false; // false
}
