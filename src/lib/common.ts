export const titlify = (s: string): string =>
  s.split('-')[0].toUpperCase() + s.slice(1).replace('-', ' ')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPageTitle = ({ org, shout }) =>
  (org === 'discours.io' ? 'Дискурс' : org) + shout ?? ` : ${titlify(shout)}`
