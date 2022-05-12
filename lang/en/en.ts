import dis from '../ru/discours.json'

export default () => {
  let o: { [key:string]: string } = {}
  Object.keys(dis).forEach(key => o[key] = key)
  return o
}