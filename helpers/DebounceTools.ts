export const useDebounce = (callback: (...args: any[]) => void, ms: number = 300): (...args: any[]) => void => {
  let timer: number;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      callback(...args);
    }, ms);
  };
};
