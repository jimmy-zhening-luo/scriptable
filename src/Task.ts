"deep-blue clipboard-list";
import Shortcut from "./app";

interface TaskSpec {
  title: string;
  notes: Null<string>;
  list: Null<string>;
  when: Null<string>;
}

void new class Task extends Shortcut<
  Table<
    | string
    | Field<"id">
  >,
  Record<
    "tasks",
    readonly TaskSpec[]
  >,
  Field<"inputString">
> {
  protected runtime() {
    const { input, setting } = this;

    if (!input)
      return { tasks: [] };

    const { inputString } = input,
    records = inputString
      .split("\n")
      .flatMap(s => s.split(";"))
      .map(s => s.trim())
      .filter(s => s),
    tasks: TaskSpec[] = [];

    for (const record in records) {
      const [
        argumentString,
        ...notes,
      ] = record.split(". ") as Arrayful,
      tokens = argumentString.startsWith("'")
        ? argumentString
          .substring(1)
          .split(" ")
          .map(a => a.trim())
          .filter(a => a) as Arrayful
        : null,
      {
        title,
        list = null,
        when = null,
      } = tokens
        ? tokens[0] in setting
          ? typeof setting[tokens[0]] === "string"
            ? {
                title: tokens
                  .slice(1)
                  .join(" "),
                when: setting[tokens[0]],
              }
            : {
                title: tokens
                  .slice(1)
                  .join(" "),
                list: setting[tokens[0]]!.id,
              }
          : {
              title: tokens.join(" "),
            }
        : { title: argumentString };

      tasks.push(
        {
          title,
          list,
          when,
          notes: notes.join(". ") || null,
        },
      );
    }

    return { tasks };
  }
}(true)
  .run();
