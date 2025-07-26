export default class Fonts {
  public rounded = {
    regular: (size = this.weight) => Font
      .regularRoundedSystemFont(size),
    bold: (size = this.weight) => Font
      .boldRoundedSystemFont(size),
    semibold: (size = this.weight) => Font
      .semiboldRoundedSystemFont(size),
    medium: (size = this.weight) => Font
      .mediumRoundedSystemFont(size),
    light: (size = this.weight) => Font
      .lightRoundedSystemFont(size),
  };
  public mono = {
    regular: (size = this.weight) => Font
      .regularMonospacedSystemFont(size),
    bold: (size = this.weight) => Font
      .boldMonospacedSystemFont(size),
    semibold: (size = this.weight) => Font
      .semiboldMonospacedSystemFont(size),
    medium: (size = this.weight) => Font
      .mediumMonospacedSystemFont(size),
    light: (size = this.weight) => Font
      .lightMonospacedSystemFont(size),
  };

  constructor(public readonly weight: number) {}

  public regular(size = this.weight) {
    return Font.systemFont(size);
  }

  public italic(size = this.weight) {
    return Font.italicSystemFont(size);
  }

  public bold(size = this.weight) {
    return Font.boldSystemFont(size);
  }

  public semibold(size = this.weight) {
    return Font.semiboldSystemFont(size);
  }

  public medium(size = this.weight) {
    return Font.mediumSystemFont(size);
  }

  public light(size = this.weight) {
    return Font.lightSystemFont(size);
  }
}
