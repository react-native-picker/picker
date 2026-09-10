'use strict';

const path = require('path');
const ts = require('typescript');

const TYPINGS_ROOT = path.resolve(__dirname, '../../typings');

function getTypingsDiagnostics() {
  const compilerOptions = {
    target: ts.ScriptTarget.ES6,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    strict: true,
    skipLibCheck: false,
    noEmit: true,
    esModuleInterop: true,
  };
  const program = ts.createProgram(
    [
      path.join(TYPINGS_ROOT, 'index.d.ts'),
      path.join(TYPINGS_ROOT, 'Picker.d.ts'),
      path.join(TYPINGS_ROOT, 'PickerIOS.d.ts'),
    ],
    compilerOptions,
  );

  return ts.getPreEmitDiagnostics(program).filter((diagnostic) => {
    if (!diagnostic.file) {
      return false;
    }
    return diagnostic.file.fileName.replace(/\\/g, '/').includes('/typings/');
  });
}

function formatDiagnostics(diagnostics) {
  return diagnostics
    .map((diagnostic) => {
      const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start,
      );
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n',
      );
      const fileName = path.relative(process.cwd(), diagnostic.file.fileName);
      return `${fileName}:${line + 1}:${character + 1} TS${
        diagnostic.code
      }: ${message}`;
    })
    .join('\n');
}

function checkPickerTypings() {
  const formatted = formatDiagnostics(getTypingsDiagnostics());
  if (formatted !== '') {
    throw new Error(`Picker typings failed:\n${formatted}`);
  }
}

if (typeof describe === 'function') {
  describe('Picker typings', () => {
    it('does not reference class type parameters from static members', () => {
      checkPickerTypings();
    });
  });
} else {
  checkPickerTypings();
}
