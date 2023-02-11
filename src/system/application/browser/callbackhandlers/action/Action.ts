class Action {
  readonly path?: string;
  readonly query?: string;
  readonly requiredQueryParamNames?: Types.stringful[];
  readonly optionalQueryParamNames?: Types.stringful[];

  constructor(
    path: string,
    query: string,
    requiredQueryParamNames: Types.stringful[],
    optionalQueryParamNames: Types.stringful[] = []
  ) {
    this.path = path;
    this.query = query;
    this.requiredQueryParamNames = requiredQueryParamNames;
    this.optionalQueryParamNames = optionalQueryParamNames;
  }
}

module.exports = Action;
