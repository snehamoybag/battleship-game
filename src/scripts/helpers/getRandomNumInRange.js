const getRandomNumInRange = (minNum, maxNum) => {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};

export default getRandomNumInRange;
