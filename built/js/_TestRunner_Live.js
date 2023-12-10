// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bug;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TestRunner;
(function (TestRunner_1) {
    const nativeScript = importModule("system/NativeScript");
    let Tests;
    (function (Tests_1) {
        Tests_1.Tests = [
            {
                name: "Storage",
                cases: [
                    [
                        "foo",
                        1,
                        1,
                    ],
                ],
            },
            {
                name: "Config",
                cases: [
                    [
                        "bar",
                        2,
                        2,
                    ],
                ],
            },
            {
                name: "ReadOnlyFile",
                cases: [
                    [
                        "baz",
                        1,
                        1,
                    ],
                ],
            },
            {
                name: "File",
                cases: [
                    [
                        "bin",
                        1,
                        1,
                    ],
                ],
            },
            {
                name: "Url",
                cases: [
                    [
                        "fizz",
                        1,
                        1,
                    ],
                ],
            },
        ];
    })(Tests || (Tests = {}));
    class TestRunner extends nativeScript {
        runtime() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const suites = Tests.Tests.map(testSuiteProto => {
                        const caseTuples = testSuiteProto.cases;
                        return new Classes.TestSuite(testSuiteProto.name, ...caseTuples.map(caseTuple => ({
                            description: caseTuple[0],
                            left: caseTuple[1],
                            right: caseTuple[2],
                        })));
                    });
                    const output = suites.map(suite => suite.execute())
                        .join("");
                    console.log(output);
                    const outputDialog = new Alert();
                    outputDialog.title = this.constructor.name;
                    outputDialog.message = output;
                    outputDialog.addAction("OK");
                    yield outputDialog.presentAlert();
                }
                catch (e) {
                    throw new EvalError(`TestRunner: runtime: Error running script: \n${e}`);
                }
            });
        }
    }
    TestRunner_1.TestRunner = TestRunner;
    let Classes;
    (function (Classes) {
        class TestSuite {
            constructor(name, ...caseTuples) {
                try {
                    this._name = name;
                    this._cases = caseTuples.map(caseTuple => new TestCase(caseTuple.description, caseTuple.left, caseTuple.right));
                }
                catch (e) {
                    throw new SyntaxError(`TestSuite.constructor() failed: ${e}\n`);
                }
            }
            execute() {
                try {
                    return `${this._name}: ${this._cases
                        .map(testCase => testCase.execute())
                        .join("")}\n`;
                }
                catch (e) {
                    throw new EvalError(`TestSuite.execute() failed: ${e}\n`);
                }
            }
        }
        Classes.TestSuite = TestSuite;
        class TestCase {
            constructor(description, left, right) {
                try {
                    this._description = description;
                    this._left = left;
                    this._right = right;
                }
                catch (e) {
                    throw new SyntaxError(`TestCase.constructor() failed: ${e}\n`);
                }
            }
            execute() {
                try {
                    return `${this._description}: ${this._left === this._right
                        ? "success"
                        : "FAIL"}\n`;
                }
                catch (e) {
                    throw new EvalError(`TestCase.execute() failed: ${e}\n`);
                }
            }
        }
        Classes.TestCase = TestCase;
    })(Classes || (Classes = {}));
})(TestRunner || (TestRunner = {}));
new TestRunner.TestRunner()
    .run();
