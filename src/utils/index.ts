export function encodeQueryParams (obj: Record<string, any>): string {
  const encodedParamsList = Object.keys(obj).reduce((acc: string[], key: string) => {
    acc.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    return acc
  }, [])

  return encodedParamsList.join('&')
}

function toCamelCase (str: string) {
  return str.replace(/_[a-z]/g, match => match[1].toUpperCase())
}

export function camelCaseKeys <T> (obj: any): T {
  if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result: T, key) => ({
        ...result,
        [toCamelCase(key)]: camelCaseKeys(obj[key])
      }),
      {} as T
    )
  }
  return obj
}
