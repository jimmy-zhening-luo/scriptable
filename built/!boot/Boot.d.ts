declare const RUNTIME_ROOT_BOOKMARK_NAME: string;
declare const REPO_SOURCE_BOOKMARK_NAME: string;
declare const IGNORE_PREFIX: string;
declare class Installer {
    static clean(): void;
    static install(): void;
    static get runtimeRootBookmarkName(): string;
    static get repoSourceBookmarkName(): string;
    static get runtimeRootPath(): string;
    private static get repoSourcePath();
    private static get ignorePrefix();
    private static get FM();
}
//# sourceMappingURL=Boot.d.ts.map