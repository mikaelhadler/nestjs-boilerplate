import querystring from 'querystring'

export const requestParam = (params = {}) => {
  const safeParams = Object.keys(params).reduce((acc, curr) => {
    if (params[curr] !== undefined && params[curr] !== null) {
      acc[curr] = params[curr]
    }
    return acc
  }, {})
  return querystring.stringify(safeParams)
}
