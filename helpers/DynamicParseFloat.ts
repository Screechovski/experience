export function dynamicParseFloat(n: string, afterDotLimit?: number): string {
  let res = n.replace(/[^0-9.]/gi, '');

  while (res.startsWith('0') && res[1] !== '.' && res[1] !== undefined) {
    res = res.substring(1);
  }

  let resWithoutDots = '';
  let wasDot = false;
  let afterDotCounter = 0;

  for (const char of res) {
    if (char === '.') {
      if (wasDot) {
        continue;
      } else {
        afterDotCounter = 0;
      }
      wasDot = true;
    }

    if (wasDot) {
      afterDotCounter += 1;
    }

    resWithoutDots += char;

    if (afterDotLimit !== undefined && afterDotLimit > 0 && afterDotCounter > afterDotLimit) {
      break;
    }
  }

  return resWithoutDots;
}
