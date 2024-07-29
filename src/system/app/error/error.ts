function error(e: Error) {
  function notify(messages: readonly string[]) {
    const n = new Notification,
    lines = [...messages];

    n.title = lines.shift() ?? "Fatal: Empty error trace.";
    n.body = lines.join("\n");
    n.sound = "failure";
    n.schedule().catch((e: unknown) => {
      throw new EvalError(
        `Fatal: Scriptable notification failed`,
        { cause: e },
      );
    });
  }

  function print(e: ErrorLike) {
    function stringify(e: unknown): string {
      return Array.isArray(e)
        ? `[${e.map((i: unknown) => stringify(i)).join(", ")}]`
        : typeof e === "object" && e !== null
          ? Object
            .keys(e)
            .map(k => `${k}: ${stringify((e as FieldTable)[k])}`)
            .join(", ")
          : String(e);
    }

    return typeof e === "object" && "message" in e
      ? e.message
      : stringify(e);
  }

  const errors = [e] as ErrorLike[];

  for (
    let ee: ErrorLike = e;
    typeof ee === "object" && "cause" in ee;
    ee = ee.cause as ErrorLike
  )
    errors.unshift(ee.cause as ErrorLike);

  const i = errors.findIndex((ee): ee is ErrorLike<true> => typeof ee === "object" && "message" in ee),
  hoisted: readonly ErrorLike[] = i < 0
    ? errors
    : [
        errors[i] as ErrorLike<true>,
        ...errors.slice(
          0,
          i,
        ),
        ...errors.slice(i + 1),
      ],
  messages = hoisted.map(e => print(e));

  console.error(messages.join("\n"));
  notify(messages);

  return messages[0] ?? "";
}

module.exports = error;
