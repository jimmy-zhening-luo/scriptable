// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
var TestRunner;
(function (TestRunner) {
    // TestRunner imports
    const shortcut = importModule("system/Shortcut");
    class TestSuite {
        constructor(id, cases, ...moreCases) {
            this.id = id;
            this.cases = this.parseInput(cases, ...moreCases);
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
            else if (cases instanceof TestSuite)
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
})(TestRunner || (TestRunner = {}));
//# sourceMappingURL=_TestRunner.js.map