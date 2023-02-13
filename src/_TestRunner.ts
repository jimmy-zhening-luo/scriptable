// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bug;
const SUPPRESS_LOGGING: boolean = false;

class TestRunner {

  private readonly suites: TestRunner.Suites;

  constructor() {
    // CLASS IMPORTS GO HERE
    const url: typeof Url = this.Shortcut.Url;
    const api: typeof Api = this.Shortcut.Api;

    // TEST VARS GO HERE
    let u: Url = new url();
    let a: Api;

    // TESTS GO HERE
    const happy: any = [];

    happy.push([
      "url",
      [(u = u).toString(), "https://"],
      [
        (u = new url(
          "bongo",
          "example.com",
          500,
          "a/b/c",
          "x=1&y=2",
          "#bingo"
        )).toString(),
        "bongo://example.com:500/a/b/c?x=1&y=2#bingo"
      ],
      [
        (u = new url(u)).toString(),
        "bongo://example.com:500/a/b/c?x=1&y=2#bingo"
      ],
      [
        (u.url = "leftduck.mano:999999/3/4/6?ea=15&eb=16#rightduck").toString(),
        "leftduck.mano:999999/3/4/6?ea=15&eb=16#rightduck"
      ],
      [
        u.toString(),
        "https://leftduck.mano/3/4/6?ea=15&eb=16#rightduck"
      ],
      [
        (u = new url("bongo://example.com:500/a/b/c?x=1&y=2#bingo")).toString(),
        "bongo://example.com:500/a/b/c?x=1&y=2#bingo"
      ],
      [
        (u.port = 2111).toString(),
        "2111"
      ],
      [
        u.toString(),
        "bongo://example.com:2111/a/b/c?x=1&y=2#bingo"
      ],
      [
        u.addParam("z", "3").toString(),
        "bongo://example.com:2111/a/b/c?x=1&y=2&z=3#bingo"
      ],
      [
        u.deleteParam("x").toString(),
        "bongo://example.com:2111/a/b/c?y=2&z=3#bingo"
      ],

      [

      ]
    ]);

    happy.push([
      "api",
      [
        (a = new api(
          "fine://example/endpoint?id=5&type=notes",
          api.Method.POST,
          ["Bearer", "12345"],
          {
            "Content-Type": "application/json",
            "model": "iPhone 1"
          },
          {
            "x": 1,
            "y": 2,
            "z": 3
          },
          55
        )).auth,
        "Bearer 12345"
      ],
      [

      ]
    ]);



















    this.suites = this.casesToSuites(...happy);
  }

  run(
    suppressLogging: boolean = false
  ): boolean {
    return this.runAll(suppressLogging);
  }

  runAll(
    suppressLogging: boolean = false
  ): boolean {
    return this
      .suites
      .every(
        suite => suite.run(suppressLogging) === true
      );
  }

  private casesToSuites(
    ...suiteInputs: [
      string,
      ...([] | TestRunner.Case)[]
    ][]
  ): TestRunner.Suites {
    return suiteInputs
      .map(
        suite => suite.length === 0 ?
          null
          : new TestRunner.Suite(...suite)
      ).filter(
        suite => suite !== null
      ) as TestRunner.Suites;
  }

  private get Shortcut(): typeof Shortcut {
    return TestRunner.Shortcut;
  }

  private static get Shortcut(): typeof Shortcut {
    return importModule("system/Shortcut")
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

    constructor(
      id: string,
      ...cases:
        (Case | Cases)[]
    );
    constructor(
      id: string,
      suite?: Suite,
      ...moreCases:
        (Case | Cases)[]
    );

    constructor(
      id: string,
      suiteOrCaseOrCases?:
        Suite
        | Case
        | Cases,
      ...moreCases:
        (Case | Cases)[]
    ) {
      this.id = id;
      this.cases = this.parseInput(
        suiteOrCaseOrCases,
        ...moreCases
      );
    }

    run(
      suppressLogging: boolean = false
    ): boolean {
      if (!suppressLogging) {
        console.log(
          "\n\n======\n"
          + this.id
          + ": "
          + this.cases.length
          + " "
          + (
              this.cases.length === 1 ?
              "case"
              : "cases"
            )
          + ":\n");
        this.cases.forEach(([evaluate, result], i) => {
          console.log(
            [
              i,
              evaluate === result,
              [evaluate, result]
                .join(", ")
            ]
              .join(": ")
          );
        });
      }
      return this.cases
        .every(([evaluate, result]) => evaluate === result);
    }

    addCase(
      cases?:
        Suite
        | Case
        | Cases,
      ...moreCases:
        (Case | Cases)[]
    ): void {
      this.cases.push(
        ...this.parseInput(
          cases,
          ...moreCases
        )
      );
    }

    private parseInput(
      cases?:
        Suite
        | Case
        | Cases,
      ...moreCases:
        (Case | Cases)[]
    ): Cases {
      const joined: Cases = [];
      if (cases === undefined) { }
      else if (cases instanceof Suite)
        joined.push(...cases.cases)
      else
        joined
          .push(
            ...caseOrCasesToCases(
              cases
            )
          );
      joined
        .push(
          ...arrCaseCasesToCases(
            moreCases
          )
        );
      return joined;

      function arrCaseCasesToCases(
        moreCases: (Case | Cases)[]
      ): Cases {
        const cases: Cases = [];
        moreCases.forEach((caseOrCases) => {
          cases.push(
            ...caseOrCasesToCases(
              caseOrCases
            )
          );
        });
        return cases;
      }

      function caseOrCasesToCases(
        caseOrCases: Case | Cases
      ): Cases {
        return caseOrCases.length === 0 ?
          []
          : Array.isArray(caseOrCases[0]) ?
            [...caseOrCases]
            : [caseOrCases];
      }
    }
  }
}

console.log(
  "\n\n\nALL test cases passed? "
  + String(
    new TestRunner()
      .run(
        SUPPRESS_LOGGING
      )
  )
    .toUpperCase()
);
