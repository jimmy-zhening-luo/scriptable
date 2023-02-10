declare const SUPPRESS_LOGGING: boolean;
declare class TestRunner {
    private readonly suites;
    constructor();
    run(suppressLogging?: boolean): void;
    runAll(suppressLogging?: boolean): void;
    private get stl();
    private casesToSuites;
}
declare namespace TestRunner {
    const stl: typeof STL;
    type Evaluate = any;
    type Result = any;
    type Case = [Evaluate, Result];
    type Cases = Case[];
    type Suites = Suite[];
    class Suite {
        readonly id: string;
        readonly cases: Cases;
        constructor(id: string, ...cases: (Case | Cases)[]);
        constructor(id: string, suite?: Suite, ...moreCases: (Case | Cases)[]);
        run(suppressLogging?: boolean): boolean;
        addCase(cases?: Suite | Case | Cases, ...moreCases: (Case | Cases)[]): void;
        private parseInput;
    }
}
//# sourceMappingURL=_TestRunner.d.ts.map