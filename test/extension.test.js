"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const vscode = require("vscode");
suite('CodingStyleExtension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');
    test('ApplyCodingStyle should format the code according to the style guidelines', () => __awaiter(void 0, void 0, void 0, function* () {
        // Open the styles.txt file
        const stylesFile = yield vscode.workspace.openTextDocument('/path/to/styles.txt');
        const stylesText = stylesFile.getText();
        // Get the active editor
        const editor = vscode.window.activeTextEditor;
        // Set the code to be formatted
        const codeToFormat = `
            function helloWorld() {
                console.log("Hello, World!");
            }
        `;
        // Apply the coding style
        const formattedCode = yield vscode.commands.executeCommand('applyCodingStyle', codeToFormat, stylesText);
        // Verify that the code is formatted correctly
        assert.strictEqual(formattedCode, `function helloWorld() {
    console.log("Hello, World!");
}`);
    }));
});
