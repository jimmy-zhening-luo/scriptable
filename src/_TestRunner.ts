// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;

namespace TestRunner {
  
  
  
  
  
  
  
  
  
  
  
  
  // TestRunner imports
  const shortcut: typeof Shortcut = importModule("system/Shortcut");
  
  
  
  
  
  
  // TestRunner interfaces and classes
  type Evaluate = any;
  type Result = any;
  type TestCase = [Evaluate, Result];
  type TestCases = TestCase[];
  
  class TestSuite {
    readonly id: string;
    readonly cases: TestCases;
    
    constructor(
      id: string,
      ...cases:
        Array<TestCase | TestCases>
    );
    
    constructor(
      id: string,
      testSuite?: TestSuite,
      ...moreCases:
        Array<TestCase | TestCases>
    );
    
    constructor(
      id: string,
      cases?:
        TestSuite
        | TestCase
        | TestCases,
      ...moreCases:
        Array<TestCase | TestCases>
    ) {
      this.id = id;
      if (cases === undefined)
        this.cases = [];
      else
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
        TestSuite
        | TestCase
        | TestCases,
      ...moreCases:
        Array<TestCase | TestCases>
    ): void {
      if (cases !== undefined)
        this.cases.push(
          ...this.parseInput(
            cases,
            ...moreCases
          )
        );
 
    
    private parseInput(
      cases?:
        TestSuite
        | TestCase
        | TestCases,
      ...moreCases:
        Array<TestCase | TestCases>
    ): TestCases {
      const joined: TestCases = [];
      if (cases instanceof TestSuite)
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
        moreCases: Array<TestCase | TestCases>
      ): TestCases {
        const cases: TestCases = [];
        moreCases.forEach((caseOrCases) => {
          cases.push(
            ...toCases(caseOrCases)
          );
        });
        return cases;
      }
      
      function caseOrCasesToCases(
        caseOrCases: TestCase | TestCases
      ): TestCases {
        return caseOrCases === [] ?
          []
          : Array.isArray(caseOrCases[0])?
            [...caseOrCases]
            : [caseOrCases];
      }
    }
  }
}