export class NRepeatedChar extends MinMaxRepeatedChar {
  constructor(
    reps: number,
    ...charsets: Array<RepeatedCharInput>
  ) {
    super(reps, reps, ...charsets);
  }

  get reps() {
    return this.minReps;
  }
}
