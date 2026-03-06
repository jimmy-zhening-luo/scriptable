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
  {
    tasks: readonly string[],
  },
  {
    weekday: keyof Alternatives;
    parity: Alternation;
  }
> {
  protected runtime() {
    const { input, setting } = this;

    if (!input)
      return { tasks: [] };

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
    tasks = setting
      .base
      .filter(task => !exclusions.has(task)),
    { length } = tasks,
    { length: numInclusions } = inclusions;

    tasks.length = length + numInclusions;

    for (let i = 0; i < numInclusions; ++i)
      tasks[length + i] = inclusions[i]!;

    tasks.reverse();

    return { tasks };
  }
}(2).run();
