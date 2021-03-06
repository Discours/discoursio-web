/* eslint regexp/no-obscure-range: 0 */
const ru2en: { [key: string]: string } = {
  'А': 'A',
  'а': 'a',
  'Б': 'B',
  'б': 'b',
  'В': 'V',
  'в': 'v',
  'Г': 'G',
  'г': 'g',
  'Д': 'D',
  'д': 'd',
  'Е': 'E',
  'е': 'e',
  'Ё': 'E',
  'ё': 'e',
  'Ж': 'Zh',
  'ж': 'zh',
  'З': 'Z',
  'з': 'z',
  'И': 'I',
  'и': 'i',
  'Й': 'Y',
  'й': 'y',
  'К': 'K',
  'к': 'k',
  'Л': 'L',
  'л': 'l',
  'М': 'M',
  'м': 'm',
  'Н': 'N',
  'н': 'n',
  'О': 'O',
  'о': 'o',
  'П': 'P',
  'п': 'p',
  'Р': 'R',
  'р': 'r',
  'С': 'S',
  'с': 's',
  'Т': 'T',
  'т': 't',
  'У': 'U',
  'у': 'u',
  'Ф': 'F',
  'ф': 'f',
  'Х': 'Kh',
  'х': 'kh',
  'Ц': 'Ts',
  'ц': 'ts',
  'Ч': 'Ch',
  'ч': 'ch',
  'Ш': 'Sh',
  'ш': 'sh',
  'Щ': 'Sch',
  'щ': 'sch',
  'ь': 'i',
  'Ы': 'Y',
  'ы': 'y',
  'ъ': '\'',
  'Э': 'E',
  'э': 'e',
  'Ю': 'Yu',
  'ю': 'yu',
  'Я': 'Ya',
  'я': 'ya'
}

export const translit = (x: string, l: string) => {
  let n

  n = Array.from(x || '')
  const isCyrillic = /[а-яА-ЯЁё]/.test(x || '')

  if (l !== 'ru' && isCyrillic) n = n.map((c: string) => ru2en[c] || c).join('')

  return n
}