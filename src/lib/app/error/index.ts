function error(error: unknown) {
  const stringify = (e: unknown): string => typeof e === "object" && e !== null
    ? Array.isArray(e)
      ? `[${e.map(i => stringify(i)).join(", ")}]`
      : `{ ${Object.entries(e).map(([k, v]) => `${k}: ${stringify(v)}`).join(", ")} }`
    : String(e),
  genuine = (e: unknown): e is Error => typeof error === "object" && error !== null && "message" in error,
  cast = (e: unknown) => genuine(e) ? e : stringify(e),
  errors = [cast(error)] as Arrayful<Error | string>;

  while (typeof errors[0] !== "string" && "cause" in errors[0])
    errors.unshift(cast(errors[0].cause));

  const [title, ...rest] = errors.map(e => typeof e === "string" ? e : e.message) as Arrayful,
  body = rest.join("\n"),
  n = new Notification;

  logError(`${title}\n${body}`);
  n.title = title;
  n.body = body;
  n.sound = "failure";
  n.schedule()
    .catch((e: unknown) => logError(e))
    .finally(() => logWarning("Error notification dispatched"));

  return new Error(title, { cause: body });
}

module.exports = error;
export type error = typeof error;
