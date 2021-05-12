export const groupByParam = (array: any, f: any) => {
  const groups = {}
  array.forEach((obj: object) => {
    const group = JSON.stringify(f(obj))
    groups[group] = groups[group] || []
    groups[group].push(obj)
  })
  return Object.keys(groups).map(group => groups[group])
}

export default groupByParam
