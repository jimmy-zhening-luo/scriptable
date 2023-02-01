class BoundedRepeatCharString extends RepeatedChar {
  readonly minReps: number;
  readonly maxReps: number;
  constructor(
    minReps: number,
    maxReps: number,
    ...charsets: Array<RepeatedChar.RepeatedCharInput>
  ) {
    super(...charsets);
    if (
      minReps < 0
      || maxReps < 0
      || Number.isNaN(minReps)
      || Number.isNaN(maxReps)
    )
      minReps = maxReps = 0;

    if (minReps > maxReps) {
      const tmp: number = minReps;
      minReps = maxReps;
      maxReps = tmp;
    }

    if (!Number.isFinite(minReps))
      this.minReps = this.maxReps = 0;
    else {
      this.minReps = minReps;
      this.maxReps = maxReps;
    }
  }

  match(token: string): boolean {
    return token.length >= this.minReps
      && token.length <= this.maxReps
      && [...token].every(
        (char: string) => (
          this.charset.includes(char)
        )
      );
  }
}
