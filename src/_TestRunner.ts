// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bug;
const SUPPRESS_LOGGING: boolean = false;

class TestRunner {
 
  private readonly suites: TestRunner.Suites;
  
  constructor() {
    // CLASS IMPORTS GO HERE
    const url: typeof Url = this.stl.url;
    
    // TEST VARS GO HERE
    let u: Url = new url();
    
    // TESTS GO HERE
    const happy: any = [
      [
        "url",
        [(u = u).toString(), "https://"],
        [
          (u = new Url(
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
          (u.port = 2111).toString,
          "bongo://example.com:2111/a/b/c?x=1&y=2#bingo"
        ]
      ],
    ];
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    this.suites = this.casesToSuites(...happy); 
  }
  
  run(
    suppressLogging: boolean = false
  ): void {
    this.runAll(suppressLogging);
  }
  
  runAll(
    suppressLogging: boolean = false
  ): void {
    for (const suite of this.suites)
      suite.run(suppressLogging);
  }
  
  private get stl(): typeof STL {
    return TestRunner.stl;
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
}


namespace TestRunner {
  
  export const stl: typeof STL = importModule("stl/STL");
  
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
        (Case|Cases)[]
    );
    constructor(
      id: string,
      suite?: Suite,
      ...moreCases:
        (Case|Cases)[]
    );
    
    constructor(
      id: string,
      suiteOrCaseOrCases?:
        Suite
        | Case
        | Cases,
      ...moreCases:
        (Case|Cases)[]
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
      if (!suppressLogging)
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
      return this.cases
        .every(([evaluate, result]) => evaluate === result);
    }
    
    addCase(
      cases?:
        Suite
        | Case
        | Cases,
      ...moreCases:
        (Case|Cases)[]
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
        (Case|Cases)[]
    ): Cases {
      const joined: Cases = [];
      if (cases === undefined) {}
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
        moreCases: (Case|Cases)[]
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
          : Array.isArray(caseOrCases[0])?
            [...caseOrCases]
            : [caseOrCases];
      }
    }
  }
}

new TestRunner().run(SUPPRESS_LOGGING);
