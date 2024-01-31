export function removeZeros(num: string, count: number): string;
export function removeZeros(num: number, count: number): string;
export function removeZeros(num: number | string): string {
  const localNumb = typeof num === 'number' ? num.toString() : num;

  let [before, after] = localNumb.split('.');

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
