function error(error: Error) {
  const stringify = (e: unknown): string => typeof e === "object" && e !== null
    ? Array.isArray(e)
      ? `[${e.map(i => stringify(i)).join(", ")}]`
      : Object.entries(e)
        .map(([k, v]) => `${k}: ${stringify(v)}`)
        .join(", ")
    : String(e),
  errors = [error] as Arrayful<ErrorLike>;

  for (let e: ErrorLike = error; typeof e === "object" && "cause" in e; e = e.cause as ErrorLike)
    errors.unshift(e.cause as ErrorLike);

  const messages = errors.map(e => typeof e === "object" && "message" in e ? e.message : stringify(e)) as Arrayful<string>,
  [title, ...rest] = messages,
  body = rest.join("\n"),
  n = new Notification;

  logError(`${title}\n${body}`);
  n.title = title;
  n.body = body;
  n.sound = "failure";
  n.schedule().catch((e: unknown) => logError(e));
  Script.setShortcutOutput(null);

  return error;
}

module.exports = error;
export type error = typeof error;
