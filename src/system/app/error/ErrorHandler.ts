class ErrorHandler {
  public static handle(e: Error): string {
    try {
      const stack: ErrorLike[] = [e];

      for (let ei: ErrorLike = e; "cause" in ei; ei = ei.cause as ErrorLike)
        stack.push(ei.cause as ErrorLike);

      const queue = [...stack]
        .reverse();
      const hoist: number = queue
        .findIndex(
          (e): e is ErrorLike<true> =>
            typeof e === "object"
            && "message" in e,
        );
      const hoistedQueue: ErrorLike[] = hoist === -1
        ? queue
        : [
            queue[hoist] as ErrorLike<true>,
            ...queue
              .slice(
                0,
                hoist,
              ),
            ...queue
              .slice(
                hoist + 1,
              ),
          ];
      const messages: string[] = hoistedQueue
        .map(
          (e: ErrorLike): string =>
            this.print(
              e,
            ),
        );

      this.log(messages);
      this.notify(messages);

      return messages.shift() ?? "";
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: handle`,
        { cause: e },
      );
    }
  }

  private static log(messages: string[]): void {
    try {
      console.error(
        messages.join("\n"),
      );
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: log`,
        { cause: e },
      );
    }
  }

  private static notify(messages: string[]): void {
    try {
      const n = new Notification();

      n.title = messages.shift() ?? "";
      n.body = messages.join("\n");
      n.sound = "failure";
      n.schedule()
        .catch(
          (n_e: unknown): never => {
            throw new Error(
              `Unhandled: Scriptable notification delivery failed`,
              { cause: n_e },
            );
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: notify`,
        { cause: e },
      );
    }
  }

  private static print(e: ErrorLike): string {
    try {
      return typeof e === "object"
        && "message" in e
          ? e.message
          : this.quotelessStringify(
            e,
          );
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: print`,
        { cause: e },
      );
    }
  }
    
  private static quotelessStringify(v: unknown): string {
    try {
      return Array.isArray(v)
        ? `[${
          v.map(
            (vi: unknown): string =>
              this.quotelessStringify(
                vi,
              ),
          )
            .join(
              ", ",
            )
        }]`
        : typeof v === "object" && v !== null
          ? Object
            .keys(
              v,
            )
            .map(
              (k: string): string =>
                `${k}: ${
                  this.quotelessStringify(
                    (v as Record<string, unknown>)[k],
                  )
                }`,
            )
            .join(", ")
          : String(v);
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: quotelessStringify`,
        { cause: e },
      );
    }
  }
}

module.exports = ErrorHandler;
