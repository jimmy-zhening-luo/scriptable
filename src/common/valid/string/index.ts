declare type vstring<V extends string> = valid<stringful, [V, "string"]>;
type Filter = "include" | "exclude";

function vstring<V extends string>(
  string: string,
  chars: char[],
  {
    filter = "exclude",
    min = 1 as Positive<fint>,
    max = Infinity as Positive<int>,
  }: {
    filter?: Filter;
    min?: Positive<fint>;
    max?: Positive<int>;
  } = {},
): vstring<V> {
  try {
    const filters = {
      include(string: string, chars: char[]): string is vstring<V> {
        return [...string].every(s => chars.includes(s as char));
      },
      exclude(string: string, chars: char[]): string is vstring<V> {
        return chars.every(c => !string.includes(c));
      },
    } satisfies Record<Filter, (string: string, chars: char[]) => string is vstring<V>>;

    if (min > max)
      throw new RangeError(`Bad args: min > max`);
    else if (string.length < min)
      throw new TypeError(`String is too short`);
    else if (!filters[filter](string, chars))
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
