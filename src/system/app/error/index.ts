function error(e: Error) {
  function stringify(e: unknown): string {
    return typeof e === "object" && e !== null
      ? Array.isArray(e)
        ? `[${e.map((i: unknown) => stringify(i)).join(", ")}]`
        : Object
          .entries(e)
          .map(([k, v]) => `${k}: ${stringify(v)}`)
          .join(", ")
      : String(e);
  }

  const errors = [e] as Arrayful<ErrorLike>;

  for (
    let ee: ErrorLike = e;
    typeof ee === "object" && "cause" in ee;
    ee = ee.cause as ErrorLike
  )
    errors.unshift(ee.cause as ErrorLike);

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
