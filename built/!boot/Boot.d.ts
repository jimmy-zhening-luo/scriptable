declare const RUNTIME_ROOT_BOOKMARK_NAME: string;
declare const REPO_SOURCE_BOOKMARK_NAME: string;
declare const EXCLUDE_PREFIX: string;
declare const INCLUDE_POSTFIX: string;
declare class Installer {
    static clean(): void;
    static install(): void;
    static get runtimeRootBookmarkName(): string;
    static get repoSourceBookmarkName(): string;
    static get runtimeRootPath(): string;
    private static get repoSourcePath();
    private static get excludePrefix();
    private static get includePostfix();
    private static get FM();
}
//# sourceMappingURL=Boot.d.ts.map