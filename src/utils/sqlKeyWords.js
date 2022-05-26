import lang from '@/i18n'
import store from '@/store'

const local = store.state.lang
const VueI18n = lang[local]

const sqlKeyWords = []
const ruleSqlKeyWords = []

const keyWords = [
  'CREATE',
  'WITH',
  'DATASOURCE',
  'KEY',
  'FORMAT',
  'CONF_KEY',
  'TYPE',
  'STRICT_VALIDATION',
  'STREAM',
  'STREAMS',
  'TABLE',
  'TABLES',
]
const ruleKeyWords = [
  'SELECT',
  'FROM',
  'JOIN',
  'LEFT',
  'INNER',
  'ON',
  'WHERE',
  'GROUP',
  'ORDER',
  'HAVING',
  'BY',
  'ASC',
  'DESC',
  'AND',
  'OR',
  'AS',
  'RROP',
  'EXPLAIN',
  'DESCRIBE',
  'SHOW',
  'WITH',
  'BIGINT',
  'FLOAT',
  'STRING',
  'DATETIME',
  'BOOLEAN',
  'ARRAY',
  'STRUCT',
  'TRUE',
  'FALSE',
  'DD',
  'HH',
  'MI',
  'SS',
  'MS',
]

const covertKeyWordsData = (data, Keywords) => {
  data.forEach((val) => {
    const tempObj = {
      name: val,
      type: 'Keyword',
      detail: `SQL ${VueI18n.sql.keyWord}`,
      documentation: '',
    }
    Keywords.push(tempObj)
  })
}

covertKeyWordsData(keyWords, sqlKeyWords)
covertKeyWordsData(ruleKeyWords, ruleSqlKeyWords)

export default {
  sqlKeyWords,
  ruleSqlKeyWords,
}
