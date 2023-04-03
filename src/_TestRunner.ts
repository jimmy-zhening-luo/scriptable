// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bug;
"use strict";
const SUPPRESS_LOGGING = false;

namespace TestRunner {
  const scriptable: typeof Scriptable = importModule("system/Scriptable");

  namespace Tests {
    export const Tests: Protos.TestSuiteProto[] = [
      {
        name: "Storage",
        cases: [["foo", 1, 1]],
      },
      {
        name: "Config",
        cases: [["bar", 2, 2]],
      },
      {
        name: "ReadOnlyFile",
        cases: [["baz", 3, 3]],
      },
      {
        name: "File",
        cases: [["bin", 4, 4]],
      },
      {
        name: "Url",
        cases: [["fizz", 5, 5]],
      },
    ];
  }

  namespace Protos {
    export interface TestSuiteProto {
      name: string;
      cases: TestCaseTriple[];
    }

    export type TestCaseTriple = [string, primitive, primitive];
  }

  export class TestRunner extends scriptable {
    runtime(): void {
      try {
        const suites: Classes.TestSuite[] = Tests.Tests.map(testSuiteProto => {
          const caseTuples: Protos.TestCaseTriple[] = testSuiteProto.cases;
          return new Classes.TestSuite(
            testSuiteProto.name,
            ...caseTuples.map(caseTuple => ({
              description: caseTuple[0],
              left: caseTuple[1],
              right: caseTuple[2],
            })),
          );
        });
        const output: string = suites.map(suite => suite.execute()).join("");
        console.log(output);
        const outputDialog: Alert = new Alert();
        outputDialog.title = this.constructor.name;
        outputDialog.message = output;
        outputDialog.addAction("OK");
        outputDialog.presentAlert();
      } catch (e) {
        throw new EvalError(
          `TestRunner: runtime: Error running script: \n${e}`,
        );
      }
    }
  }

  namespace Classes {
    export class TestSuite {
      private readonly _name: string;
      private readonly _cases: TestCase[];

      constructor(
        name: string,
        ...caseTuples: {
          description: string;
          left: primitive;
          right: primitive;
        }[]
      ) {
        try {
          this._name = name;
          this._cases = caseTuples.map(
            caseTuple =>
              new TestCase(
                caseTuple.description,
                caseTuple.left,
                caseTuple.right,
              ),
          );
        } catch (e) {
          throw new SyntaxError(`TestSuite.constructor() failed: ${e}\n`);
        }
      }

      execute(): string {
        try {
          return `${this._name}: ${this._cases
            .map(testCase => testCase.execute())
            .join("")}\n`;
        } catch (e) {
          throw new EvalError(`TestSuite.execute() failed: ${e}\n`);
        }
      }
    }

    export class TestCase {
      private readonly _description: string;
      private readonly _left: primitive;
      private readonly _right: primitive;

      constructor(description: string, left: primitive, right: primitive) {
        try {
          this._description = description;
          this._left = left;
          this._right = right;
        } catch (e) {
          throw new SyntaxError(`TestCase.constructor() failed: ${e}\n`);
        }
      }

      execute(): string {
        try {
          return `${this._description}: ${
            this._left === this._right ? "success" : "FAIL"
          }\n`;
        } catch (e) {
          throw new EvalError(`TestCase.execute() failed: ${e}\n`);
        }
      }
    }
  }
}

new TestRunner.TestRunner().run();
