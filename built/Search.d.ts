declare namespace Search {
    const shortcut: typeof Shortcut;
    export class Search extends shortcut {
        runtime(args: any): SearchResponse | null;
    }
    interface SearchResponse {
        app: string;
        actions: string[];
        showWebview?: boolean;
    }
    export {};
}
//# sourceMappingURL=Search.d.ts.map