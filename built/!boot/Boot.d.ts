declare const RUNTIME_ROOT_BOOKMARK: string;
declare const REPO_SOURCE_BOOKMARK: string;
declare const IGNORE_PREFIX: string;
declare class Installer {
    static clean(): void;
    static install(): void;
    static get runtimeRootBookmark(): string;
    static get repoSourceBookmark(): string;
    static get runtimeRootPath(): string;
    private static get repoSourcePath();
    private static get ignorePrefix();
    private static get FM();
}
//# sourceMappingURL=Boot.d.ts.map