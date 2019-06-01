import {
  languages,
  ExtensionContext,
  FormattingOptions,
  TextDocument,
  TextEdit,
  Range,
  DocumentFormattingEditProvider
} from 'vscode'
import { formatText, UserOptions } from 'lua-fmt-ext'
class LuaFormatProvider implements DocumentFormattingEditProvider {
  public provideDocumentFormattingEdits(
    document: TextDocument,
    options: FormattingOptions
  ): TextEdit[] {
    return [
      TextEdit.replace(
        document.validateRange(new Range(0, 0, Infinity, Infinity)),
        formatText(document.getText(), options as UserOptions)
      )
    ]
  }
}
export function activate(context: ExtensionContext) {
  languages.registerDocumentFormattingEditProvider('lua', new LuaFormatProvider())
}