const Generator = (id: number, seed: number | undefined = 0) => {
  const getNow = () => Math.floor((Date.now() - seed!) / 1000);
  let counter = 0;
  let nextTime = 0;
  const next = () => {
    counter = 0;
    nextTime = getNow() + 1;
  };

  const uuid = () => {
    const now = getNow();
    if (now < nextTime) {
      if (counter > 4095) {
        throw Error("uuid out of range");
      }
    } else {
      next();
    }

    const time = (nextTime & 0x1ffffffff) * 2097152;
    const uid = (id & 0x1ff) * 4096;
    const count = counter & 0xfff;
    const uuid = time + uid + count;

    counter++;

    return uuid;
  };
  return { id, seed, uuid };
};

export default Generator;
