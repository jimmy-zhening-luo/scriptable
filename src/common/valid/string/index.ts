declare type vstring<V extends string> = valid<stringful, [V, "string"]>;

function vstring<V extends string>(
  string: string,
  chars: char[],
  {
    rule = "exclude",
    min = 1 as Positive<fint>,
    max = Infinity as Positive<int>,
  }: {
    rule?: "include" | "exclude";
    min?: Positive<fint>;
    max?: Positive<int>;
  } = {},
): vstring<V> {
  try {
    const rules = {
      include(string: string, chars: char[]): string is vstring<V> {
        return [...string].every(s => chars.includes(s as char));
      },
      exclude(string: string, chars: char[]): string is vstring<V> {
        return chars.every(c => !string.includes(c));
      },
    } satisfies Record<"include" | "exclude", (string: string, chars: char[]) => string is vstring<V>>;

    if (min > max)
      throw new RangeError(`Bad args: min > max`);
    else if (string.length < min)
      throw new TypeError(`String is too short`);
    else if (!rules[rule](string, chars))
      throw new TypeError(`String has disallowed chars`);
    else
      return string;
  }
  catch (e) {
    throw new SyntaxError(`vstring`, { cause: e });
  }
}

module.exports = vstring;
export type { vstring };
