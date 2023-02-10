// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: bug;
const SUPPRESS_LOGGING = false;
class TestRunner {
    constructor() {
        // CLASS IMPORTS GO HERE
        const url = this.stl.url;
        // TEST VARS GO HERE
        let u = new url();
        // TESTS GO HERE
        const happy = [
            [
                "url",
                [(u = u).toString(), "https://"],
                [
                    (u = new url("bongo", "example.com", 500, "a/b/c", "x=1&y=2", "#bingo")).toString(),
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
    run(suppressLogging = false) {
        this.runAll(suppressLogging);
    }
    runAll(suppressLogging = false) {
        for (const suite of this.suites)
            suite.run(suppressLogging);
    }
    get stl() {
        return TestRunner.stl;
    }
    casesToSuites(...suiteInputs) {
        return suiteInputs
            .map(suite => suite.length === 0 ?
            null
            : new TestRunner.Suite(...suite)).filter(suite => suite !== null);
    }
}
(function (TestRunner) {
    TestRunner.stl = importModule("stl/STL");
    class Suite {
        constructor(id, suiteOrCaseOrCases, ...moreCases) {
            this.id = id;
            this.cases = this.parseInput(suiteOrCaseOrCases, ...moreCases);
        }
        run(suppressLogging = false) {
            if (!suppressLogging)
                this.cases.forEach(([evaluate, result], i) => {
                    console.log([
                        i,
                        evaluate === result,
                        [evaluate, result]
                            .join(", ")
                    ]
                        .join(": "));
                });
            return this.cases
                .every(([evaluate, result]) => evaluate === result);
        }
        addCase(cases, ...moreCases) {
            this.cases.push(...this.parseInput(cases, ...moreCases));
        }
        parseInput(cases, ...moreCases) {
            const joined = [];
            if (cases === undefined) { }
            else if (cases instanceof Suite)
                joined.push(...cases.cases);
            else
                joined
                    .push(...caseOrCasesToCases(cases));
            joined
                .push(...arrCaseCasesToCases(moreCases));
            return joined;
            function arrCaseCasesToCases(moreCases) {
                const cases = [];
                moreCases.forEach((caseOrCases) => {
                    cases.push(...caseOrCasesToCases(caseOrCases));
                });
                return cases;
            }
            function caseOrCasesToCases(caseOrCases) {
                return caseOrCases.length === 0 ?
                    []
                    : Array.isArray(caseOrCases[0]) ?
                        [...caseOrCases]
                        : [caseOrCases];
            }
        }
    }
    TestRunner.Suite = Suite;
})(TestRunner || (TestRunner = {}));
new TestRunner().run(SUPPRESS_LOGGING);
//# sourceMappingURL=_TestRunner.js.map