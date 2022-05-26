// 拼接创建 Stream 时的 SQL 语句，用法参照标记模板
export const parseWithStatement = (streamWith) => {
  let withSql = 'WITH ('
  const withOption = Object.keys(streamWith)
  withOption.forEach((key) => {
    if (streamWith[key]) {
      withSql += `${key}="${streamWith[key]}", `
    }
  })
  withSql += ');'
  return withSql
}

export default (strings, ...values) => {
  const parseObjectToString = (objVals, isChild) => {
    let structVal = ''
    const objKeys = Object.keys(objVals)
    objKeys.forEach((key, index) => {
      if (typeof objVals[key] === 'object') {
        const objValue = parseObjectToString(objVals[key], true)
        structVal += `${key} ${objValue}`
      } else {
        structVal += `${key} ${objVals[key]}`
      }
      if (index + 1 !== objKeys.length) {
        structVal += `, `
      }
    })
    const struct = `(
      ${structVal}
    )`
    if (isChild) {
      return `struct${struct}`
    }
    return struct
  }
  let sql = ''
  strings.forEach((str, index) => {
    let value = values[index]
    if (typeof value === 'object') {
      value = parseObjectToString(value)
    }
    if (str && value) {
      sql += `${str}${value}`
    }
  })
  sql += strings[strings.length - 1]
  return sql
}
