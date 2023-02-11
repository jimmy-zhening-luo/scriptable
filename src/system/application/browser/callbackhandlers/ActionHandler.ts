class ActionHandler {

  private readonly _action: Action;

  constructor(
    path: string,
    query: string,
    requiredQueryParamNames: Types.stringful[],
    optionalQueryParamNames: Types.stringful[] = []
  ) {
    this._action = new ActionHandler._Action(
      path,
      query,
      requiredQueryParamNames,
      optionalQueryParamNames
    );
  }

  paramRecords(
    queryParamValues: Record<Types.stringful, string>
  ) {

    return queryParam.toString();
  }

}

namespace ActionHandler {

  export const _Action: typeof Action = importModule("action/Action");

  export const _QueryParam: typeof QueryParam = importModule("queryparam/QueryParam");

}

module.exports = ActionHandler;
