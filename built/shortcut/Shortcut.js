const _Application = importModule("_Application/Application");
class Shortcut extends Application {
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
module.exports = Shortcut;
//# sourceMappingURL=Shortcut.js.map