export function pad(str: string, length: number, char: string) {
  let p = str;
  while (p.length < length) {
    p = char.concat(p);
  }
  return p;
}
