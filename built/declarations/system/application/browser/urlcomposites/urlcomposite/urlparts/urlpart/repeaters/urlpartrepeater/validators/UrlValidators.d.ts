declare class UrlValidators {
    static get ValidUrlPart(): typeof ValidUrlPart;
    static get ValidUrlRepeater(): typeof ValidUrlRepeater;
    static get Scheme(): typeof ValidScheme;
    static get CharSet(): typeof CharSet;
    static get UrlCharSet(): typeof UrlCharSet;
    static get Host(): {
        Repeaters: {
            IPv4: typeof ValidHostIPv4Repeater;
            IPv6: typeof ValidHostIPv6Repeater;
            RegName: typeof ValidHostRegNameRepeater;
        };
    };
    static get Port(): typeof ValidPort;
    static get Path(): {
        Repeaters: {
            Path: typeof ValidPathRepeater;
        };
    };
    static get Query(): {
        Repeaters: {
            Query: typeof ValidQueryRepeater;
        };
    };
    static get Fragment(): typeof ValidFragment;
}
//# sourceMappingURL=UrlValidators.d.ts.map