export default function (error: unknown) {
  const trace = [error];

  while (Error.isError(trace[0]))
    void trace.unshift(trace[0].cause);

  if (trace.length !== 1) {
    const rootIndex = trace.findIndex(
      e => Error.isError(e),
    );

    if (rootIndex > 0)
      [trace[0], trace[rootIndex]] = [trace[rootIndex], trace[0]];
  }

  const root = trace.shift()!,
  serialize = (frame: unknown) => typeof frame === "object"
    ? Error.isError(frame)
      ? frame.name === "Error"
        ? frame.message
        : String(frame)
      : JSON.stringify(frame as unknown)
    : String(frame),
  header = serialize(root),
  stack = trace.map(serialize).join("\n");

  console.error(header);
  console.error(stack);

  return {
    header,
    stack,
  };
}
