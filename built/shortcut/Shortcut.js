class _Shortcut extends Application {
    get input() {
        return args;
    }
    handleOutput(output) {
        Script.setShortcutOutput(output);
        return output;
    }
    get configSubdirectoryPath() {
        return [
            super.configSubdirectoryPath,
            "Shortcut"
        ].join("/");
    }
}
module.exports = _Shortcut;
//# sourceMappingURL=Shortcut.js.map