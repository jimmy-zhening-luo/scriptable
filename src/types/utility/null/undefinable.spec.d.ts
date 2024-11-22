declare namespace Undefinable {
  export type Result = 0 | Test<{
    T: {
      a: true;
    };
    F: {
      a: never;
    };
  }>;
}
