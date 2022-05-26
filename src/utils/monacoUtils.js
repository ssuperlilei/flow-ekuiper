/* eslint-disable */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

const getInertText = (text, type, lang) => {
  switch (lang) {
    case 'sql':
      if (type === 'Keyword') {
        return `${text} `
      } else if (type === 'Method') {
        return `${text}()`
      }
      return text
    case 'json':
      if (text === 'struct') {
        return '{}'
      } else {
        return `"${text}"`
      }
    default:
      return text
  }
}

export const createMonacoComplete = (hints, range, word, lang) => {
  let customHints = []
  if (hints.length) {
    customHints = hints.map((hint) => ({
      label: hint.name,
      kind: hint.type ? monaco.languages.CompletionItemKind[hint.type] : monaco.languages.CompletionItemKind.Function, // icon
      documentation: hint.documentation,
      insertText: getInertText(hint.name, hint.type, lang),
      detail: hint.detail || 'Kuiper',
      range,
    }))
  }
  return customHints
}

const getValueName = (hint) => {
  let { name, default: defaultValue, valueType, detail } = hint
  if (valueType) {
    name = `${name}: ${valueType}`
  }
  if (detail) {
    name = `${name} - ${detail}`
  }
  return defaultValue ? `${name}, value: ${defaultValue}` : name
}
export const createMonacoHover = (key, hints) => {
  const contents = []
  hints.forEach((hint) => {
    if (key === hint.name) {
      contents.push(
        {
          value: getValueName(hint),
        },
        {
          value: hint.documentation,
        },
      )
    }
  })
  return contents
}

export default {}
