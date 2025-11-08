import FontFamily from "./font";

const enum em {
  Footnote = 2,
  Body,
  Subheading,
  Heading,
  Title,
}

const enum Scale {
  N = em.Body,
  Title = em.Title / N,
  Heading = em.Heading / N,
  Subheading = em.Subheading / N,
  Body = em.Body / N,
  Footnote = em.Footnote / N,
}

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

  public font(scale?: number) {
    return this.body.regular(scale);
  }

  public title() {
    return this.body.semibold(Scale.Title);
  }

  public heading() {
    return this.body.semibold(Scale.Heading);
  }

  public subheading() {
    return this.body.semibold(Scale.Subheading);
  }

  public footnote() {
    return this.body.light(Scale.Footnote);
  }
}
