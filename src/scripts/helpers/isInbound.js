const isInbound = (minNum, maxNum, cordinate = []) => {
  if (!cordinate || cordinate.length < 2) return false;

  const [nthRow, nthColumn] = cordinate;
  const isRowInbound = nthRow >= minNum && nthRow <= maxNum;
  const isColumnInbound = nthColumn >= minNum && nthColumn <= maxNum;

  return isRowInbound && isColumnInbound;
};

export default isInbound;
