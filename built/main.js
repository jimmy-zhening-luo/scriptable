"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hello(compiler) {
    return ((compiler === null || compiler === void 0 ? void 0 : compiler.constructor) === String) ?
        String(compiler)
        : String();
}
console.log(hello("TypeScript"));
