"deep-purple clipboard-list";
import Shortcut from "./app";

type Alternation = "$0" | "$1";
type Alternatives = Record<
  (
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
  ),
  | string[]
  | Record<Alternation, string[]>
>;

interface Setting {
  base: readonly string[];
  exclude: Alternatives;
  include: Alternatives;
}

void new class DailyTask extends Shortcut<
  Setting,
  readonly string[],
  {
    weekday: keyof Alternatives;
    parity: Alternation;
  }
> {
  protected runtime() {
    const { input, setting } = this;

    if (!input)
      return [];

    const { weekday, parity } = input,
    unpack = (
      alternatives: Alternatives[keyof Alternatives],
      parity: Alternation,
    ) => Array.isArray(alternatives)
      ? alternatives
      : alternatives[parity],
    exclusions = new Set(
      unpack(
        setting.exclude[weekday],
        parity,
      ),
    ),
    inclusions = unpack(
      setting.include[weekday],
      parity,
    ),
    base = setting
      .base
      .filter(task => !exclusions.has(task)),
    { length } = base,
    { length: numInclusions } = inclusions;

    base.length = length + numInclusions;

    for (let i = 0; i < numInclusions; ++i)
      base[length + i] = inclusions[i]!;

    base.reverse();

    return base;
  }
}().run();
