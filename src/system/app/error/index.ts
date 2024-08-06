function error(e: Error) {
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

    return typeof e === "object" && "message" in e ? e.message : stringify(e);
  }

  const errors = [e] as ErrorLike[];

  for (
    let ee: ErrorLike<true> = e;
    typeof ee === "object" && "cause" in ee;
    ee = ee.cause as ErrorLike<true>
  )
    errors.unshift(ee.cause as ErrorLike<true>);

  const messages = errors.map(e => print(e)),
  n = new Notification;

  n.title = messages[0] ?? "Fatal: Empty error trace.";
  n.body = messages.slice(1).join("\n");
  n.sound = "failure";
  n.schedule().catch((e: unknown) => logError(e));
  logError(messages.join("\n"));

  return e;
}

module.exports = error;
export type error = typeof error;
