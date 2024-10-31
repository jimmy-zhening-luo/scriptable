export default function stringfuls<T extends readonly string[]>(array: T, cause = "") {
  if (array.length < 1 || !array.every((i): i is stringful => i.length > 0))
    throw new TypeError("Unstringful array", { cause });

  return array as unknown as (
    T extends readonly [string, ...string[]]
      ? { [K in keyof T]: stringful; }
      : Arrayful<stringful>
  );
}
