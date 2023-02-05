declare const EXTERNAL_SECRETS_BOOKMARK_NAME: string;
declare class Secret {
    private readonly file;
    constructor(subpath: string);
    private get externalSecretsBookmarkName();
    get exists(): boolean;
    get path(): string;
    get subpath(): string;
    get filename(): string;
    get secret(): string;
    get key(): string;
    read(): string;
    toString(): string;
}
//# sourceMappingURL=Secret.d.ts.map