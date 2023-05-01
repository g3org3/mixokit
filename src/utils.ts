export function getCode(name?: string) {
  return (name || '')
    .toLowerCase()
    .replaceAll('.', '')
    .replaceAll(' ', '_')
    .replaceAll('"', '')
    .replaceAll('/', '')
}
