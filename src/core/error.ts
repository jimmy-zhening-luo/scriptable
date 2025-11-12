export default function (
  app: string,
  error: unknown,
) {
  const trace = [error];

  while (Error.isError(trace[0]))
    void trace.unshift(trace[0].cause);

  const rootIndex = trace.findIndex(
    e => Error.isError(e),
  );

  if (rootIndex > 0)
    void trace.unshift(
      (trace.splice(rootIndex, 1) as [Error])[0],
    );

  function print(e: unknown) {
    return Error.isError(e)
      ? e.name === "Error"
        ? e.message
        : String(e)
      : typeof e === "object"
        && e !== null
        ? JSON.stringify(e)
        : String(e);
  }

  const root = trace.shift()!,
  subtitle = [print(root)],
  stack = trace.map(print).join("\n");

  if (Error.isError(root)) {
    const source = root.stack
      ?.split("\n")
      .find(frame => frame.length > 1)
      ?.slice(0, -1);

    if (
      source !== undefined
      && source !== "runtime"
    )
      void subtitle.unshift(source);
  }

  const notification = new Notification;

  notification.title = app;
  notification.subtitle = subtitle.join(": ");
  notification.body = stack;
  notification.sound = "failure";
  void notification.schedule();
  console.error(stack);

  if (Error.isError(root)) {
    root.cause = stack;

    throw root;
  }

  throw Error(root, { cause: stack });
}
