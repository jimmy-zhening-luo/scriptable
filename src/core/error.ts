export default function (error: unknown) {
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

  return {
    root: trace.shift()!,
    trace,
  };
}
