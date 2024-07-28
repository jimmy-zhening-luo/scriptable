function errorcatch(top: Error) {
  function notify(messages: readonly string[]) {
    const notif = new Notification,
    lines = [...messages];

    notif.title = lines.shift() ?? "";
    notif.body = lines.join("\n");
    notif.sound = "failure";
    notif.schedule().catch(
      (e: unknown) => {
        throw new EvalError(
          `Scriptable notification failed`,
          { cause: e },
        );
      },
    );
  }

  function print(error: ErrorLike) {
    function quotelessStringify(error: unknown): string {
      return Array.isArray(error)
        ? `[${error.map((vi: unknown) => quotelessStringify(vi)).join(", ")}]`
        : typeof error === "object" && error !== null
          ? Object
            .keys(error)
            .map(k => `${k}: ${quotelessStringify((error as FieldTable)[k])}`)
            .join(", ")
          : String(error);
    }

    return typeof error === "object" && "message" in error
      ? error.message
      : quotelessStringify(error);
  }

  const queue: ErrorLike[] = [top];

  for (
    let i: ErrorLike = top;
    typeof i === "object" && "cause" in i;
    i = i.cause as ErrorLike
  )
    queue.unshift(i.cause as ErrorLike);

  const hoist = queue.findIndex((error): error is ErrorLike<true> => typeof error === "object" && "message" in error),
  hoistedQueue: readonly ErrorLike[] = hoist > -1
    ? [
        queue[hoist] as ErrorLike<true>,
        ...queue.slice(
          0,
          hoist,
        ),
        ...queue.slice(hoist + 1),
      ]
    : queue,
  messages = hoistedQueue.map(error => print(error));

  console.error(messages.join("\n"));
  notify(messages);

  return messages.shift() ?? "";
}

module.exports = errorcatch;
