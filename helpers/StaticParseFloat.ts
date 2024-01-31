export function staticParseFloat(n: string): string {
  const localNumb = n.replace(/[^0-9.]/gi, '');

  let [before, after] = localNumb.split('.');

  while (before.startsWith('0') && before.length > 1) {
    before = before.substring(1, before.length);
  }

  if (after === undefined) {
    return before;
  }

  while (after.endsWith('0')) {
    after = after.slice(0, -1);
  }

  if (after.length) {
    return `${before}.${after}`;
  }

  return before;
}