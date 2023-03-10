// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bug;
const SUPPRESS_LOGGING = false;

class TestRunner {
  private readonly _suites: TestRunner.Suites;

  constructor() {
    try {
      // CLASS IMPORTS GO HERE
      const url: typeof Url = TestRunner.Shortcut.Url;

      // TEST VARS GO HERE
      let u: Url = new url();

      // TESTS GO HERE
      this._suites = this._casesToSuites([
        "url",
        [(u = u).toString(), "https://"],
        [
          (u = new url(
            "bongo",
            "example.com",
            500,
            "a/b/c",
            "x=1&y=2",
            "#bingo",
          )).toString(),
          "bongo://example.com:500/a/b/c?x=1&y=2#bingo",
        ],
        [
          (u = new url(u)).toString(),
          "bongo://example.com:500/a/b/c?x=1&y=2#bingo",
        ],
        [
          (u.url =
            "leftduck.mano:999999/3/4/6?ea=15&eb=16#rightduck").toString(),
          "leftduck.mano:999999/3/4/6?ea=15&eb=16#rightduck",
        ],
        [u.toString(), "https://leftduck.mano/3/4/6?ea=15&eb=16#rightduck"],
        [
          (u = new url(
            "bongo://example.com:500/a/b/c?x=1&y=2#bingo",
          )).toString(),
          "bongo://example.com:500/a/b/c?x=1&y=2#bingo",
        ],
        [(u.port = 2111).toString(), "2111"],
        [u.toString(), "bongo://example.com:2111/a/b/c?x=1&y=2#bingo"],
        [
          u.addParam("z", "3").toString(),
          "bongo://example.com:2111/a/b/c?x=1&y=2&z=3#bingo",
        ],
        [
          u.deleteParam("x").toString(),
          "bongo://example.com:2111/a/b/c?y=2&z=3#bingo",
        ],

        [],
      ]);
    } catch (e) {
      throw new SyntaxError(
        `TestRunner: constructor: Failed to parse test matrix into Suite[] using _casesToSuites: \n${e}`,
      );
    }
  }
  run(suppressLogging = false): boolean {
    try {
      return this._suites.every(suite => suite.run(suppressLogging) === true);
    } catch (e) {
      throw new EvalError(
        `TestRunner: runAll: Failed to run all suites: \n${e}`,
      );
    }
  }

  private _casesToSuites(
    ...suiteInputs: [string, ...([] | TestRunner.Case)[]][]
  ): TestRunner.Suites {
    try {
      return suiteInputs
        .map(suite =>
          suite.length === 0 ? null : new TestRunner.Suite(...suite),
        )
        .filter(suite => suite !== null) as TestRunner.Suites;
    } catch (e) {
      throw new SyntaxError(
        `TestRunner: casesToSuites: Failed to parse suites: \n${e}`,
      );
    }
  }
  private static get Shortcut(): typeof Shortcut {
    try {
      return importModule("system/Shortcut");
    } catch (e) {
      throw new ReferenceError(
        `TestRunner: Shortcut: Failed to import Shortcut module: \n${e}`,
      );
    }
  }
}

namespace TestRunner {
  export type Evaluate = any;
  export type Result = any;
  export type Case = [Evaluate, Result];
  export type Cases = Case[];
  export type Suites = Suite[];

  export class Suite {
    readonly id: string;
    readonly cases: Cases;

    constructor(id: string, ...cases: (Case | Cases)[]);
    constructor(id: string, suite?: Suite, ...moreCases: (Case | Cases)[]);

    constructor(
      id: string,
      suiteOrCaseOrCases?: Suite | Case | Cases,
      ...moreCases: (Case | Cases)[]
    ) {
      try {
        this.id = id;
        this.cases = this._parseInput(suiteOrCaseOrCases, ...moreCases);
      } catch (e) {
        throw new SyntaxError(
          `\nSuite: constructor: Failed to initialize Suite with id "${id}" using _parseInput method: \n${e}`,
        );
      }
    }

    run(suppressLogging = false): boolean {
      try {
        if (!suppressLogging) {
          console.log(
            "\n\n======\n" +
              this.id +
              ": " +
              String(this.cases.length) +
              " " +
              (this.cases.length === 1 ? "case" : "cases") +
              ":\n",
          );
          this.cases.forEach(([evaluate, result], i) => {
            console.log(
              [i, evaluate === result, [evaluate, result].join(", ")].join(
                ": ",
              ),
            );
          });
        }
        return this.cases.every(([evaluate, result]) => evaluate === result);
      } catch (e) {
        throw new Error(
          `\nSuite: run: Suite "${this.id}" failed to run: \n${e}`,
        );
      }
    }

    addCase(
      cases?: Suite | Case | Cases,
      ...moreCases: (Case | Cases)[]
    ): void {
      try {
        this.cases.push(...this._parseInput(cases, ...moreCases));
      } catch (e) {
        throw new Error(
          `\nSuite: addCase: Suite "${this.id}" failed to add case: \n${e}`,
        );
      }
    }

    private _parseInput(
      cases?: Suite | Case | Cases,
      ...moreCases: (Case | Cases)[]
    ): Cases {
      try {
        const joined: Cases = [];
        if (cases === undefined) {
        } else if (cases instanceof Suite) joined.push(...cases.cases);
        else joined.push(..._caseOrCasesToCases(cases));
        joined.push(..._arrCaseCasesToCases(moreCases));
        return joined;
      } catch (e) {
        throw new Error(
          `\nSuite: _parseInput: Suite "${this.id}" failed to parse input: \n${e}`,
        );
      }

      function _arrCaseCasesToCases(moreCases: (Case | Cases)[]): Cases {
        try {
          const cases: Cases = [];
          moreCases.forEach(caseOrCases => {
            cases.push(..._caseOrCasesToCases(caseOrCases));
          });
          return cases;
        } catch (e) {
          throw new SyntaxError(
            `\nSuite: _parseInput: _arrCaseCasesToCases: Failed to flatten an array of Case or Case[] to an array of Case: \n${e}`,
          );
        }
      }

      function _caseOrCasesToCases(caseOrCases: Case | Cases): Cases {
        try {
          return caseOrCases.length === 0
            ? []
            : Array.isArray(caseOrCases[0])
            ? [...caseOrCases]
            : [caseOrCases];
        } catch (e) {
          throw new SyntaxError(
            `\nSuite: _parseInput: _caseOrCasesToCases: Failed to convert Case or Case[] to Case[]: \n${e}`,
          );
        }
      }
    }
  }
}

try {
  console.log(
    `\n\n\n_TestRunner.js: ALL test cases passed: ${String(
      new TestRunner().run(SUPPRESS_LOGGING),
    ).toUpperCase()}`,
  );
} catch (e) {
  console.error(
    `\n\n\n_TestRunner.js: Encountered an error while attempting to run all test cases: \n${e}`,
  );
}
