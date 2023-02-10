// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bug;

namespace TestRunner {
  
  export const suites: TestClass.Suites = [];
  
  const stl: typeof STL = importModule("stl/STL");
  
  // Url test cases
  const url: typeof Url = stl.url;
  suites.push(
    new TestClass.Suite(
      "url",
      [new Url().toString(), "https://"]
    )
  );
  
}

// TestRunner interfaces and classes
namespace TestClass {
  
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
        Array<Case | Cases>
    );
    constructor(
      id: string,
      suite?: Suite,
      ...moreCases:
        Array<Case | Cases>
    );
    
    constructor(
      id: string,
      suiteOrCases?:
        Suite
        | Case
        | Cases,
      ...moreCases:
        Array<Case | Cases>
    ) {
      this.id = id;
      this.cases = this.parseInput(
        cases,
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
        Array<Case | Cases>
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
        Array<Case | Cases>
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
        moreCases: Array<Case | Cases>
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

for (const suite of TestRunner.suites)
  suite.run();