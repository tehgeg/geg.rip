const identifyStraightValue = (straight) => {
  const valueMap = { 14: 'Ace', 13: 'King', 12: 'Queen', 11: 'Jack', 10: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5, 4: 4, 3: 3, 2: 2, 1: 'Ace' }
  let firstValue = straight[0].value
  let lastValue = straight[straight.length - 1].value
  if (firstValue === 'Joker') {
    firstValue = valueMap[straight[1].numericValue() + 1]
  }
  if (lastValue === 'Joker') {
    lastValue = valueMap[straight[straight.length - 2].numericValue() - 1]
  }

  return [firstValue, lastValue]
}

export {
  identifyStraightValue
}
