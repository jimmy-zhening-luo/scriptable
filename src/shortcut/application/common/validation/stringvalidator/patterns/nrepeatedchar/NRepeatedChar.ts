class NRepeatedChar extends MinMaxRepeatedChar {
  constructor(
    reps: number,
    ...charsets: Array<RepeatedChar.RepeatedCharInput>
  ) {
    super(reps, reps, ...charsets);
  }

  get reps() {
    return this.minReps;
  }
}
