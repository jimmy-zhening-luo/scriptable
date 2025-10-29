import FontFamily from "./font";

export default class {
  public readonly body;
  public readonly round;

  constructor(public readonly weight: number) {
    this.body = new FontFamily("", weight);
    this.round = new FontFamily("Rounded", weight);
  }

  public title() {
    return this.body.semibold(
      2 * this.weight,
    );
  }

  public heading() {
    return this.body.semibold(
      Math.round(5 / 3 * this.weight),
    );
  }

  public subheading() {
    return this.body.semibold(
      Math.round(3 / 2 * this.weight),
    );
  }

  public footnote() {
    return this.body.light(
      Math.round(5 / 6 * this.weight),
    );
  }
}
