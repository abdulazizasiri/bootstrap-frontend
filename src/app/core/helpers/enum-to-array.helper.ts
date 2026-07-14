export function enumToArray(enumObj: any){
 const arr = Object.keys(enumObj)
  .filter(k => isNaN(enumObj[k]))
  .map((key, i) => ({id: key, value: enumObj[key]}))
  return arr
}
