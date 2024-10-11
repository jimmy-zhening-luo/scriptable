function error(error: Error) {
  const stringify = (e: unknown): string => typeof e === "object" && e !== null
    ? Array.isArray(e)
      ? `[${e.map(i => stringify(i)).join(", ")}]`
      : stringify(Object.entries(e).map(([k, v]) => `${k}: ${stringify(v)}`))
    : String(e),
  errors = [error] as Arrayful<ErrorLike>;

  while (typeof errors[0] === "object" && "cause" in errors[0])
    errors.unshift(errors[0].cause as ErrorLike);

  const messages = errors.map(e => typeof e === "object" && "message" in e ? e.message : stringify(e)) as Arrayful<string>,
  [title, ...rest] = messages,
  body = rest.join("\n"),
  n = new Notification;

  logError(`${title}\n${body}`);
  n.title = title;
  n.body = body;
  n.sound = "failure";
  n.schedule().catch((e: unknown) => logError(e));

  return error;
}

module.exports = error;
export type error = typeof error;
