export default class ErrorHandler {
  public handle(
    e: Error,
  ) {
    try {
      const stack: ErrorLike[] = [e];

      for (
        let ei: ErrorLike = e;
        "cause" in ei;
        ei = ei
          .cause as ErrorLike
      )
        stack
          .push(
            ei
              .cause as ErrorLike,
          );

      const queue: readonly ErrorLike[] = [...stack]
        .reverse();
      const hoist = queue
        .findIndex(
          (e): e is ErrorLike<
            true
          > =>
            typeof e === "object"
            && "message" in e,
        );
      const hoistedQueue: readonly ErrorLike[] = hoist === -1
        ? queue
        : [
            queue[
              hoist
            ] as ErrorLike<
              true
            >,
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
      const messages = hoistedQueue
        .map(
          e =>
            this
              .print(
                e,
              ),
        );

      this
        .log(
          messages,
        );
      this
        .notify(
          messages,
        );

      return messages
        .shift()
        ?? "";
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: handle`,
        { cause: e },
      );
    }
  }

  private log(
    messages: readonly string[],
  ) {
    try {
      console
        .error(
          messages
            .join(
              "\n",
            ),
        );
    }
    catch (e) {
      throw new EvalError(
        `ErrorHandler: log`,
        { cause: e },
      );
    }
  }

  private notify(
    messages: readonly string[],
  ) {
    try {
      const note = new Notification();
      const lines = [...messages];

      note
        .title = lines
          .shift()
          ?? "";
      note
        .body = lines
          .join(
            "\n",
          );
      note
        .sound = "failure";
      note
        .schedule()
        .catch(
          (n_e: unknown) => {
            throw new Error(
              `Unhandled: Scriptable failed to show notification`,
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

  private print(
    e: ErrorLike,
  ) {
    try {
      return typeof e === "object"
        && "message" in e
        ? e
          .message
        : this
          .quotelessStringify(
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

  private quotelessStringify(
    v: unknown,
  ): string {
    try {
      return Array.isArray(
        v,
      )
        ? `[${
          v
            .map(
              (vi: unknown) =>
                this
                  .quotelessStringify(
                    vi,
                  ),
            )
            .join(
              ", ",
            )
        }]`
        : typeof v === "object"
        && v !== null
          ? Object
            .keys(
              v,
            )
            .map(
              k =>
                `${
                  k
                }: ${
                  this
                    .quotelessStringify(
                      (
                        v as Record<
                          string
                          ,
                          unknown
                        >
                      )[
                        k
                      ],
                    )
                }`,
            )
            .join(
              ", ",
            )
          : String(
            v,
          );
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
