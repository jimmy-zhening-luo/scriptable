import FontFamily from "./font";

export default class {
  public readonly body;
  public readonly round;

  constructor(weight: number) {
    this.body = new FontFamily("", weight);
    this.round = new FontFamily("Rounded", weight);
  }

  public size(scale?: number) {
    return this.body.size(scale);
  }

  public title() {
    return this.body.semibold(2);
  }

  public heading() {
    return this.body.semibold(5 / 3);
  }

  public subheading() {
    return this.body.semibold(1.5);
  }

  public footnote() {
    return this.body.light(5 / 6);
  }
}
