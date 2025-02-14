declare namespace Undefinable {
  export type Result = 0 | Test<{
    T: [
      true,
    ];
    F: [
      never,
    ];
  }>;
}
