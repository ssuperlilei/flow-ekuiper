import lang from '@/i18n'
import store from '@/store'

const local = store.state.lang
const VueI18n = lang[local]
const dataTypeProvider = []
const dataType = ['bigint', 'float', 'string', 'datetime', 'boolean', 'array', 'struct']

dataType.forEach((val) => {
  const tempObj = {
    name: val,
    detail: `Kuiper ${VueI18n.sql.dataType}`,
    type: 'Field',
    documentation: VueI18n.sql[val],
    valueType: '',
  }
  dataTypeProvider.push(tempObj)
})

export default dataTypeProvider
