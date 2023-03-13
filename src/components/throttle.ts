function throttle(func: Function, delay: number = 500) {
  let timer: NodeJS.Timeout | null = null;

  return (...args: unknown[]) => {
    if (timer) {
      return;
    }
    func(...args);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

export default throttle;
