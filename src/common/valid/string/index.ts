declare type vstring<Validator extends string> = valid<stringful, [Validator, "string"]>;
type Filter = "include" | "exclude";

function vstring<Validator extends string>(
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
): vstring<Validator> {
  try {
    const filters = {
      include(string: string, chars: char[]): string is vstring<Validator> {
        return [...string].every(s => chars.includes(s as char));
      },
      exclude(string: string, chars: char[]): string is vstring<Validator> {
        return chars.every(c => !string.includes(c));
      },
    } satisfies Record<Filter, (string: string, chars: char[]) => string is vstring<Validator>>;

    if (min > max)
      throw new RangeError(`Bad args: min > max`);
    else if (string.length < min)
      throw new TypeError(`String is too short`);
    else if (!filters[filter](string, chars))
      throw new TypeError(`String has disallowed chars`);
    else
      return string;
  }
  catch (e) { throw new SyntaxError(`vstring`, { cause: e }); }
}

module.exports = vstring;
export type { vstring };
