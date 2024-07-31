declare type charstring<Validator extends string> = valid<stringful, [Validator, "string"]>;
type Filter = "include" | "exclude";

function charstring<Validator extends string>(
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
): charstring<Validator> {
  try {
    const filters = {
      include(string: string, chars: char[]): string is charstring<Validator> {
        return [...string].every(s => chars.includes(s as char));
      },
      exclude(string: string, chars: char[]): string is charstring<Validator> {
        return [...string].every(s => chars.includes(s as char));
      },
    } satisfies Record<Filter, (string: string, chars: char[])=> string is charstring<Validator>>;

    if (min > max)
      throw new RangeError(`Bad args: min > max`);
    else if (string.length < min)
      throw new TypeError(`String is too short`);
    else if (!filters[filter](
      string,
      chars,
    ))
      throw new TypeError(`String has disallowed chars`);
    else
      return string;
  }
  catch (e) {
    throw new SyntaxError(
      `charstring`,
      { cause: e },
    );
  }
}

module.exports = charstring;
