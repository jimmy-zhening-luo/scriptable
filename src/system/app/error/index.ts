function error(e: Error) {
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

  const errors = [e] as Arrayful<ErrorLike>;

  for (
    let ee: ErrorLike<true> = e;
    typeof ee === "object" && "cause" in ee;
    ee = ee.cause as ErrorLike<true>
  )
    errors.unshift(ee.cause as ErrorLike<true>);

  const messages = errors.map(e => typeof e === "object" && "message" in e ? e.message : stringify(e)) as Arrayful<string>,
  [title, ...stack] = messages,
  body = stack.join("\n"),
  n = new Notification;

  n.title = title;
  n.body = body;
  n.sound = "failure";
  n.schedule().catch((e: unknown) => logError(e));
  logError(`${title}\n${body}`);

  return e;
}

module.exports = error;
export type error = typeof error;
