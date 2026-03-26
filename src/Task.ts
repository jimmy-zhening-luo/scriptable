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
      arguments = argumentString.startsWith("'")
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
      } = arguments
        ? arguments[0] in setting
          ? typeof setting[arguments] === "string"
            ? {
                title: arguments
                  .slice(1)
                  .join(" "),
                when: setting[arguments],
              }
            : {
                title: arguments
                  .slice(1)
                  .join(" "),
                list: setting[arguments]!.id,
              }
          : {
              title: arguments.join(" "),
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
