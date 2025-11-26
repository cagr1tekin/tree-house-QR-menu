export function slugify(text: string): string {
  const trMap: { [key: string]: string } = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
    'ı': 'i', 'I': 'i',
    'ö': 'o', 'Ö': 'o',
    'İ': 'i'
  };
  
  return text
    .split('')
    .map(char => trMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Alfanümerik olmayanları kaldır
    .trim()
    .replace(/\s+/g, '-'); // Boşlukları tire yap
}
