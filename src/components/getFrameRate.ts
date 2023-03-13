const FRAME_RATES = [60, 144, 240];

export default async function getFrameRate() {
  let count = 0;
  let lastTime = 0;

  const framePrefixSum = new Map();

  FRAME_RATES.forEach((fps) => framePrefixSum.set(fps, 0));

  while (++count < 60) {
    const timeStamp = 1000 / (performance.now() - lastTime);

    const [frameRate] = FRAME_RATES.reduce(
      (accumulator, current) => {
        const diff = Math.abs(current - timeStamp);
        if (accumulator[1] > diff) {
          return [current, diff];
        }
        return accumulator;
      },
      [0, Infinity]
    );

    framePrefixSum.set(frameRate, framePrefixSum.get(frameRate) + 1);
    lastTime = performance.now();

    await new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });
  }

  return FRAME_RATES.reduce((accumulator, current) => {
    if (framePrefixSum.get(accumulator) < framePrefixSum.get(current)) {
      return current;
    }
    return accumulator;
  });
}
