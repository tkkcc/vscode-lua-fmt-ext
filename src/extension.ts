import {
  languages,
  TextDocument,
  TextEdit,
  Range,
  DocumentFormattingEditProvider,
  workspace,
  Uri
} from 'vscode'
import { formatText } from 'lua-fmt-ext'
function getConfig() {
  return workspace.getConfiguration('luaFmtExt') as any
}
class FormatProvider implements DocumentFormattingEditProvider {
  public provideDocumentFormattingEdits(document: TextDocument): TextEdit[] {
    return [
      TextEdit.replace(
        document.validateRange(new Range(0, 0, Infinity, Infinity)),
        formatText(document.getText(), getConfig())
      )
    ]
  }
}
export function activate() {
  languages.registerDocumentFormattingEditProvider({ scheme: 'file', language: 'lua' }, new FormatProvider())
}
