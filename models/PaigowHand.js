import Card from './Card'
import { identifyStraightValue } from '../util'

function PaigowHand(cards = []) {
  this.hand = cards
  this.low = []
  this.lowValue = null
  this.lowRank = null
  this.high = []
  this.highValue = null
  this.highRank = null
  this.aceHigh = false
}

PaigowHand.sortCards = (cards) => (
  cards.sort((a, b) => b.numericValue() - a.numericValue())
)

PaigowHand.sortCardsWithJoker = (j, cards) => {
  cards.sort((a, b) => {
    let aVal = a.isJoker() ? (j + 0.5) : a.numericValue()
    let bVal = b.isJoker() ? (j + 0.5) : b.numericValue()
    return bVal - aVal
  })
}

PaigowHand.identifyHand = (hand) => {
  const isRepeatDup = (straight, dups) => {
    return dups.some((dup) => {
      if (dup.length !== straight.length) { return false }
      return dup.every((card, idx) => {
        return card.value === straight[idx].value && card.suit === straight[idx].suit
      })
    })
  }

  PaigowHand.sortCards(hand)

  let prevCard = new Card('', 0)
  let paigow = ''
  const pairs = []
  const trips = []
  let quads = []
  const hasJoker = hand.some(c => c.isJoker())
  let fiveAces = false
  let currentMatchCount = 1
  let straights = []
  let jokerStraights = []
  let jokerWheels = []
  const flushCount = { Clubs: 0, Diamonds: 0, Hearts: 0, Spades: 0 }
  let flush = []
  let straightFlushes = []

  hand.forEach((card, index, arr) => {
    if (!card.isJoker()) {
      flushCount[card.suit] += 1

      if (prevCard.value === card.value) {
        currentMatchCount++
        if (index === arr.length - 1) {
          if (currentMatchCount === 4) {
            quads.push(arr.slice(index - 3))
          } else if (currentMatchCount === 3) {
            trips.push(arr.slice(index - 2))
          } else if (currentMatchCount === 2) {
            pairs.push(arr.slice(index - 1))
          }
        }
      }
      if (prevCard.value !== card.value) {
        if (currentMatchCount === 4) {
          quads.push(arr.slice(index - 4, index))
        } else if (currentMatchCount === 3) {
          trips.push(arr.slice(index - 3, index))
        } else if (currentMatchCount === 2) {
          pairs.push(arr.slice(index - 2, index))
        }
        currentMatchCount = 1
      }

      let newStraight = [card]
      let dupStraights = []
      straights.forEach((s) => {
        let prevCard = s[s.length - 1]
        if (prevCard.numericValue() === card.numericValue() + 1) {
          if (s.length < 5) {
            s.push(card)
          }
        } else if (prevCard.numericValue() === card.numericValue() && s.length > 1) {
          const dup = [...s.slice(0, -1), card]
          if (!isRepeatDup(dup, dupStraights)) {
            dupStraights.push(dup)
          }
        }
      })
      straights.push(newStraight)
      if (dupStraights.length) {
        straights.push(...dupStraights)
      }

      prevCard = card
    }
  })

  if (flushCount.Clubs > 3) {
    flush = hand.filter((card) => card.suit === 'Clubs')
  } else if (flushCount.Diamonds > 3) {
    flush = hand.filter((card) => card.suit === 'Diamonds')
  } else if (flushCount.Hearts > 3) {
    flush = hand.filter((card) => card.suit === 'Hearts')
  } else if (flushCount.Spades > 3) {
    flush = hand.filter((card) => card.suit === 'Spades')
  }

  const wheels = []
  straights.forEach((s) => {
    if (s.length === 4 && s[3].numericValue() === 2) {
      const aceIndices = hand.reduce((list, card, idx) => (
        card.numericValue() === 14 ? [...list, idx] : list
      ), [])
      aceIndices.forEach((aceIdx) => {
        wheels.push([...s, hand[aceIdx]])
      })
    }
  })
  straights = straights.filter((s) => (
    s.length > 4
  )).concat(wheels)

  let quadAcesJoker = false;
  let tripAcesJoker = false;
  if (hasJoker) {
    const joker = hand[0]
    if (quads.length && quads[0][0].value === 'Ace') {
      quads = []
      fiveAces = true
    }
    if (trips.length && trips[0][0].value === 'Ace') {
      const [tripAces] = trips.splice(0, 1)
      quads.push([joker, ...tripAces])
      quadAcesJoker = true
    }
    if (pairs.length && pairs[0][0].value === 'Ace') {
      const [pairAces] = pairs.splice(0, 1)
      trips.unshift([joker, ...pairAces])
      tripAcesJoker = true
    }
    if (!fiveAces && !quadAcesJoker && !tripAcesJoker) {
      const aceIndex = hand.findIndex((c) => c.value === 'Ace')
      if (aceIndex > -1) {
        pairs.unshift([joker, hand[aceIndex]])
      }
    }

    if (flush.length) {
      flush.unshift(hand[0])
    }

    let lowVal = (hand[hand.length - 1].numericValue() - 1) < 2 ? 2 : (hand[hand.length - 1].numericValue() - 1)
    for (let jokerValue = lowVal; jokerValue <= 14; jokerValue++) {
      PaigowHand.sortCardsWithJoker(jokerValue, hand)

      jokerStraights = []
      hand.forEach((card) => {
        let newStraight = [card]
        let dupStraights = []
        jokerStraights.forEach((s) => {
          let cardValue = card.isJoker() ? jokerValue : card.numericValue()
          let prevCard = s[s.length - 1]
          let prevCardValue = prevCard.isJoker() ? jokerValue : prevCard.numericValue()
          if (prevCardValue === cardValue + 1) {
            if (s.length < 5) {
              s.push(card)
            }
          } else if (prevCardValue === cardValue && s.length > 1) {
            dupStraights.push([...s.slice(0, -1), card])
          }
        })
        jokerStraights.push(newStraight)
        if (dupStraights.length) {
          jokerStraights.push(...dupStraights)
        }
      })

      jokerWheels = []

      if (jokerValue === 14) {
        jokerStraights.forEach((s) => {
          if (s.length === 4 && s[3].numericValue() === 2) {
            jokerWheels.push([...s, hand.find((c) => c.isJoker())])
          }
        })
      } else {
        jokerStraights.forEach((s) => {
          if (s.length === 4 && s.some((c) => c.isJoker()) && (s[3].numericValue() === 2 || (s[3].isJoker() && jokerValue === 2))) {
            const aceIndices = hand.reduce((list, card, idx) => (
              card.numericValue() === 14 ? [...list, idx] : list
            ), [])
            aceIndices.forEach((aceIdx) => {
              jokerWheels.push([...s, hand[aceIdx]])
            })
          }
        })
      }

      jokerStraights = jokerStraights.filter((s) => (
        s.length > 4 && s.some((c) => c.isJoker())
      )).concat(jokerWheels)
      straights = [...straights, ...jokerStraights]
    }
    PaigowHand.sortCards(hand)
  } else {
    if (flush.length < 5) {
      flush = []
    }
  }

  straights.sort((a, b) => {
    let aRank = a[4].numericValue()
    let bRank = b[4].numericValue()

    if (aRank === 15) {
      aRank = a[3].numericValue() === 2 ? 9.5 : a[3].numericValue() - 1
    }
    if (bRank === 15) {
      bRank = b[3].numericValue() === 2 ? 9.5 : b[3].numericValue() - 1
    }

    return bRank - aRank
  })

  const sFlushIndices = []
  straights.forEach((s, idx) => {
    const suit = s[0].isJoker() ? s[1].suit : s[0].suit
    const sFlush = s.every((c) => c.isJoker() || c.suit === suit)
    if (sFlush) {
      sFlushIndices.unshift(idx)
    }
  })
  sFlushIndices.forEach((idx) => {
    straightFlushes.unshift(...straights.splice(idx, 1))
  })

  if (!pairs.length && !trips.length && !quads.length && !fiveAces && !straights.length && !flush.length && !straightFlushes.length) {
    paigow = hand[0].value
  }

  return {
    paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes,
  }
}

PaigowHand.lowValueAndRank = (lowHand) => {
  const result = { lowValue: null, lowRank: '' }
  if (!lowHand.length) { return result }
  if (lowHand[0].value === lowHand[1].value || lowHand[0].value === 'Joker' && lowHand[1].value === 'Ace') {
    result.lowValue = 1
    result.lowRank = `Pair of ${lowHand[1].value}s`
  } else {
    result.lowValue = 0
    const firstValue = lowHand[0].isJoker() ? 'Ace' : lowHand[0].value
    result.lowRank = `${firstValue}, ${lowHand[1].value}`
  }

  return result
}

PaigowHand.highValueAndRank = (highHand) => {
  const result = { highValue: null, highRank: '', result: {} }
  if (!highHand.length) { return result }

  const {
    paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes
  } = PaigowHand.identifyHand(highHand)

  result.result = { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes }

  if (fiveAces) {
    result.highValue = 9
    result.highRank = 'Five Aces'
  } else if (straightFlushes.length) {
    const [first, last] = identifyStraightValue(straightFlushes[0])
    result.highValue = 8
    result.highRank = `Straight Flush, ${first} to ${last}`
  } else if (quads.length) {
    result.highValue = 7
    result.highRank = `Quad ${quads[0][3].value}s`
  } else if (trips.length && pairs.length) {
    result.highValue = 6
    result.highRank = `Full House, ${trips[0][2].value}s over ${pairs[0][1]}s`
  } else if (flush.length) {
    result.highValue = 5
    result.highRank = `Flush, ${flush[0].isJoker() ? 'Ace' : flush[0].value} High`
  } else if (straights.length) {
    const [first, last] = identifyStraightValue(straights[0])
    result.highValue = 4
    result.highRank = `Straight, ${first} to ${last}`
  } else if (trips.length) {
    result.highValue = 3
    result.highRank = `Set of ${trips[0][2].value}s`
  } else if (pairs.length === 2) {
    result.highValue = 2
    result.highRank = `Two Pair, ${pairs[0][1].value}s and ${pairs[1][1].value}s`
  } else if (pairs.length === 1) {
    result.highValue = 1
    result.highRank = `Pair of ${pairs[0][1].value}s`
  } else if (paigow) {
    result.highValue = 0
    result.highRank = `${paigow === 'Joker' ? 'Ace' : paigow} High`
  }

  return result
}

PaigowHand.isFoulHand = (low = [], high = []) => {
  if (low.length !== 2 || high.length !== 5) { return true }

  const { lowValue } = PaigowHand.lowValueAndRank(low)
  const { highValue, result: highResult } = PaigowHand.highValueAndRank(high)

  if (lowValue > highValue) { return true }
  if (highValue > lowValue) { return false }

  PaigowHand.sortCards(low)
  if (lowValue === 1) {
    const lowPair = low[1].numericValue()
    const highPair = highResult.pairs[0][1].numericValue()
    return lowPair > highPair
  }

  for (let i = 0; i < 2; i++) {
    const lowCardValue = low[i].isJoker() ? 14 : low[i].numericValue()
    const highCardValue = high[i].isJoker() ? 14 : high[i].numericValue()
    if (highCardValue > lowCardValue) { return false }
    if (lowCardValue > highCardValue) { return true }
  }

  return false
}

PaigowHand.compareLowHand = (playerHand, dealerHand) => {
  const { lowValue: playerValue } = PaigowHand.lowValueAndRank(playerHand)
  const { lowValue: dealerValue } = PaigowHand.lowValueAndRank(dealerHand)

  if (playerValue > dealerValue) { return 'PLAYER' }
  if (dealerValue > playerValue) { return 'DEALER' }

  PaigowHand.sortCards(playerHand)
  PaigowHand.sortCards(dealerHand)
  if (playerValue === 1) {
    const playerPair = playerHand[1].numericValue()
    const dealerPair = dealerHand[1].numericValue()
    return playerPair > dealerPair ? 'PLAYER' : 'DEALER'
  }

  for (let i = 0; i < 2; i++) {
    const playerCard = playerHand[i].isJoker() ? 14 : playerHand[i].numericValue()
    const dealerCard = dealerHand[i].isJoker() ? 14 : dealerHand[i].numericValue()
    if (playerCard > dealerCard) { return 'PLAYER' }
    if (dealerCard > playerCard) { return 'DEALER' }
  }

  return 'DEALER'
}

PaigowHand.compareHighHand = (playerHand, dealerHand) => {
  const { highValue: playerValue, result: playerResult } = PaigowHand.highValueAndRank(playerHand)
  const { highValue: dealerValue, result: dealerResult } = PaigowHand.highValueAndRank(dealerHand)

  if (playerValue > dealerValue) { return 'PLAYER' }
  if (dealerValue > playerValue) { return 'DEALER' }

  const betterStraight = (straight1, straight2) => {
    let straight1Value = straight1[4].numericValue()
    let straight2Value = straight2[4].numericValue()

    if (straight1Value === 15) {
      straight1Value = straight1[3].numericValue() === 2 ? 9.5 : straight1[3].numericValue() - 1
    }
    if (straight2Value === 15) {
      straight2Value = straight2[3].numericValue() === 2 ? 9.5 : straight2[3].numericValue() - 1
    }

    if (straight1Value > straight2Value) { return 1 }
    if (straight2Value > straight1Value) { return -1 }
    return 0
  }

  /* Tiebreakers */
  // Straight Flush
  if (playerValue === 8) {
    return betterStraight(playerResult.straightFlushes[0], dealerResult.straightFlushes[0]) === 1 ? 'PLAYER' : 'DEALER'
  }

  // Quads
  if (playerValue === 7) {
    const playerQuads = playerResult.quads[0][3].numericValue()
    const dealerQuads = dealerResult.quads[0][3].numericValue()
    return playerQuads > dealerQuads ? 'PLAYER' : 'DEALER'
  }

  // Full House
  if (playerValue === 6) {
    const playerSet = playerResult.trips[0][2].numericValue()
    const dealerSet = dealerResult.trips[0][2].numericValue()
    return playerSet > dealerSet ? 'PLAYER' : 'DEALER'
  }

  // Flush
  if (playerValue === 5) {
    for (let i = 0; i < 5; i++) {
      const playerCard = playerResult.flush[i].isJoker() ? 14 : playerResult.flush[i].numericValue()
      const dealerCard = dealerResult.flush[i].isJoker() ? 14 : dealerResult.flush[i].numericValue()
      if (playerCard > dealerCard) { return 'PLAYER' }
      if (dealerCard > playerCard) { return 'DEALER' }
    }
    return 'DEALER'
  }

  // Straight
  if (playerValue === 4) {
    return betterStraight(playerResult.straights[0], dealerResult.straights[0]) === 1 ? 'PLAYER' : 'DEALER'
  }

  // Set
  if (playerValue === 3) {
    const playerSet = playerResult.trips[0][2].numericValue()
    const dealerSet = dealerResult.trips[0][2].numericValue()
    return playerSet > dealerSet ? 'PLAYER' : 'DEALER'
  }

  // Two Pair
  if (playerValue === 2) {
    const playerFirstPair = playerResult.pairs[0][1].numericValue()
    const playerSecondPair = playerResult.pairs[1][1].numericValue()
    const playerRemainingCards = playerHand.filter(c => {
      const cVal = c.isJoker() ? 14 : c.numericValue()
      return cVal !== playerFirstPair && cVal !== playerSecondPair
    })
    const dealerFirstPair = dealerResult.pairs[0][1].numericValue()
    const dealerSecondPair = dealerResult.pairs[1][1].numericValue()
    const dealerRemainingCards = dealerHand.filter(c => {
      const cVal = c.isJoker() ? 14 : c.numericValue()
      return cVal !== dealerFirstPair && cVal !== dealerSecondPair
    })

    if (playerFirstPair !== dealerFirstPair) {
      return playerFirstPair > dealerFirstPair ? 'PLAYER' : 'DEALER'
    }

    if (playerSecondPair !== dealerSecondPair) {
      return playerSecondPair > dealerSecondPair ? 'PLAYER' : 'DEALER'
    }

    const playerLastCard = playerRemainingCards[0].isJoker() ? 14 : playerRemainingCards[0].numericValue()
    const dealerLastCard = dealerRemainingCards[0].isJoker() ? 14 : dealerRemainingCards[0].numericValue()
    return playerLastCard > dealerLastCard ? 'PLAYER' : 'DEALER'
  }

  // Pair
  if (playerValue === 1) {
    const playerPair = playerResult.pairs[0][1].numericValue()
    const playerRemainingCards = playerHand.filter(c => {
      const cVal = c.isJoker() ? 14 : c.numericValue()
      return cVal !== playerPair
    })
    PaigowHand.sortCards(playerRemainingCards)
    const dealerPair = dealerResult.pairs[0][1].numericValue()
    const dealerRemainingCards = dealerHand.filter(c => {
      const cVal = c.isJoker() ? 14 : c.numericValue()
      return cVal !== dealerPair
    })
    PaigowHand.sortCards(dealerRemainingCards)

    if (playerPair !== dealerPair) {
      return playerPair > dealerPair ? 'PLAYER' : 'DEALER'
    }

    for (let i = 0; i < 3; i++) {
      const playerCard = playerRemainingCards[i].isJoker() ? 14 : playerRemainingCards[i].numericValue()
      const dealerCard = dealerRemainingCards[i].isJoker() ? 14 : dealerRemainingCards[i].numericValue()
      if (playerCard > dealerCard) { return 'PLAYER' }
      if (dealerCard > playerCard) { return 'DEALER' }
    }
    return 'DEALER'
  }

  // Paigow
  for (let i = 0; i < 5; i++) {
    const playerCard = playerHand[i].isJoker() ? 14 : playerHand[i].numericValue()
    const dealerCard = dealerHand[i].isJoker() ? 14 : dealerHand[i].numericValue()
    if (playerCard > dealerCard) { return 'PLAYER' }
    if (dealerCard > playerCard) { return 'DEALER' }
  }
  return 'DEALER'
}

PaigowHand.prototype = {
  checkAceHigh: function () {

  },
  checkFortune: function () {

  },
  hasJoker: function () {
    return this.hand.some(c => c.isJoker())
  },
  isSet: function () {
    return this.low.length === 2 && this.high.length === 5
  },
  sortHand: function () {
    this.hand.sort((a, b) => b.numericValue() - a.numericValue())
  },
  sortedCopy: function () {
    return [...this.hand].sort((a, b) => b.numericValue() - a.numericValue())
  },
  freeCards: function (quads, trips, pairs) {
    const sorted = this.sortedCopy()
    const quadVals = quads.length ? [quads[0][0].value === 'Joker' ? 'Ace' : quads[0][0].value] : []
    const tripVals = trips.length ? trips.map(t => t[0].value === 'Joker' ? 'Ace' : t[0].value) : []
    const pairVals = pairs.length ? pairs.map(p => p[0].value === 'Joker' ? 'Ace' : p[0].value) : []

    return sorted.reduce((list, card) => {
      const value = card.value === 'Joker' ? 'Ace' : card.value
      if (!quadVals.includes(value) && !tripVals.includes(value) && !pairVals.includes(value)) {
        return [...list, card]
      }
      return list
    }, [])
  },
  // ruleset -> https://wizardofodds.com/games/pai-gow-poker/house-way/trump-plaza-atlantic-city/
  setHouseWay: function () {
    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = PaigowHand.identifyHand(this.hand)
    const freeCards = this.freeCards(quads, trips, pairs)

    // paigow
    if (paigow) {
      if (paigow === 'Joker' || paigow === 'Ace') {
        this.aceHigh = true
      }
      this.low = [this.hand[1], this.hand[2]]
      this.high = [this.hand[0], ...this.hand.slice(3)]
      const { lowValue, lowRank } = PaigowHand.lowValueAndRank(this.low)
      this.lowValue = lowValue
      this.lowRank = lowRank
      this.highValue = 0
      this.highRank = `${this.high[0].isJoker() ? 'Ace' : this.high[0].value} High`
      return
    }

    // five aces
    if (fiveAces) {
      const pairOfKings = pairs.length && pairs[0][0].value == 'King'
      this.low = pairOfKings ? this.hand.slice(-2) : this.hand.slice(0, 2)
      this.high = pairOfKings ? this.hand.slice(0, 5) : this.hand.slice(2)
      const { lowValue, lowRank } = PaigowHand.lowValueAndRank(this.low)
      this.lowValue = lowValue
      this.lowRank = lowRank
      if (pairOfKings) {
        this.highValue = 9
        this.highRank = '5 Aces'
      } else if (pairs.length) {
        this.highValue = 6
        const boatPair = pairs[0][0].value
        this.highRank = `Full House, Aces full of ${boatPair}s`
      } else {
        this.highValue = 3
        this.highRank = 'Set of Aces'
      }
      return
    }

    // quads
    if (quads.length) {
      if (trips.length) {
        this.low = trips[0].slice(0, 2)
        this.high = [...quads[0], trips[0][2]]
        this.highValue = 7
        this.highRank = `Quad ${quads[0][3].value}s`
      } else if (pairs.length) {
        this.low = pairs[0]
        this.high = [...quads[0], ...freeCards]
        this.highValue = 7
        this.highRank = `Quad ${quads[0][3].value}s`
      } else {
        const quadValue = quads[0][0].numericValue()
        if (quadValue < 7) {
          this.low = quads[0].slice(-2)
          this.high = [...quads[0].slice(0, 2), ...freeCards]
          this.highValue = 1
          this.highRank = `Pair of ${quads[0][1].value}s`
        } else if (quadValue > 6 && quadValue < 11) {
          if (freeCards[0].numericValue() > 12) {
            this.low = freeCards.slice(0, 2)
            this.high = [...quads[0], ...freeCards.slice(2)]
            this.highValue = 7
            this.highRank = `Quad ${quads[0][3].value}s`
          } else {
            this.low = quads[0].slice(-2)
            this.high = [...quads[0].slice(0, 2), ...freeCards]
            this.highValue = 1
            this.highRank = `Pair of ${quads[0][1].value}s`
          }
        } else if (quadValue > 10 && quadValue < 14) {
          if (freeCards[0].numericValue() > 13) {
            this.low = freeCards.slice(0, 2)
            this.high = [...quads[0], ...freeCards.slice(2)]
            this.highValue = 7
            this.highRank = `Quad ${quads[0][3].value}s`
          } else {
            this.low = quads[0].slice(-2)
            this.high = [...quads[0].slice(0, 2), ...freeCards]
            this.highValue = 1
            this.highRank = `Pair of ${quads[0][1].value}s`
          }
        } else {
          this.low = quads[0].slice(-2)
          this.high = [...quads[0].slice(0, 2), ...freeCards]
          this.highValue = 1
          this.highRank = `Pair of ${quads[0][1].value}s`
        }
      }
      const { lowValue, lowRank } = PaigowHand.lowValueAndRank(this.low)
      this.lowValue = lowValue
      this.lowRank = lowRank
      return
    }

    // boats
    if (trips.length && pairs.length) {
      if (trips.length > 1) {
        const availableCards = PaigowHand.sortCards([...freeCards, trips[0][2]])
        this.low = trips[0].slice(0, 2)
        this.high = [...trips[1], ...availableCards]
        this.highValue = 3
        this.highRank = `Set of ${trips[1][2].value}s`
      } else if (pairs.length > 1) {
        this.low = pairs[0]
        this.high = [...trips[0], ...pairs[1]]
        this.highValue = 6
        this.highRank = `Full House, ${trips[0][2].value}s full of ${pairs[1][1].value}s`
      } else {
        if (pairs[0][0].value === 2 && freeCards[0].numericValue() > 13 && freeCards[1].numericValue() > 12) {
          this.low = freeCards
          this.high = [...trips[0], ...pairs[0]]
          this.highValue = 6
          this.highRank = `Full House, ${trips[0][2].value}s full of ${pairs[1][1].value}s`
        } else {
          this.low = pairs[0]
          this.high = [...trips[0], ...freeCards]
          this.highValue = 3
          this.highRank = `Set of ${trips[0][2].value}s`
        }
      }
      const { lowValue, lowRank } = PaigowHand.lowValueAndRank(this.low)
      this.lowValue = lowValue
      this.lowRank = lowRank
      return
    }

    // three pair
    if (pairs.length === 3) {
      this.low = pairs[0]
      this.high = [...pairs[1], ...pairs[2], ...freeCards]
      this.highValue = 2
      this.highRank = `Two Pair, ${pairs[1][1].value}s and ${pairs[2][1].value}s`
      const { lowValue, lowRank } = PaigowHand.lowValueAndRank(this.low)
      this.lowValue = lowValue
      this.lowRank = lowRank
      return
    }

    // two pair
    if (pairs.length === 2) {
      const pairRank = (pairValue) => {
        if (pairValue > 1 && pairValue < 7) {
          return 'L'
        } else if (pairValue > 6 && pairValue < 11) {
          return 'M'
        }
        return 'H'
      }

      if (pairs[0][0].numericValue() > 13) {
        this.low = pairs[1]
        this.high = [...pairs[0], ...freeCards]
        this.highValue = 1
        this.highRank = `Pair of ${pairs[0][1].value}s`
      } else {
        const pair1Rank = pairRank(pairs[0][0].numericValue())
        const pair2Rank = pairRank(pairs[1][0].numericValue())
        const pairRanks = pair1Rank + pair2Rank
        if (['HH', 'HM', 'MH'].includes(pairRanks)) {
          this.low = pairs[1]
          this.high = [...pairs[0], ...freeCards]
          this.highValue = 1
          this.highRank = `Pair of ${pairs[0][1].value}s`
        } else if (['MM', 'HL', 'LH'].includes(pairRanks)) {
          if (freeCards[0].numericValue() > 13) {
            this.low = freeCards.slice(0, 2)
            this.high = [...pairs[0], ...pairs[1], ...freeCards.slice(-1)]
            this.highValue = 2
            this.highRank = `Two Pair, ${pairs[0][1].value}s and ${pairs[1][1].value}s`
          } else {
            this.low = pairs[1]
            this.high = [...pairs[0], ...freeCards]
            this.highValue = 1
            this.highRank = `Pair of ${pairs[0][1].value}s`
          }
        } else {
          if (freeCards[0].numericValue() > 12) {
            this.low = freeCards.slice(0, 2)
            this.high = [...pairs[0], ...pairs[1], ...freeCards.slice(-1)]
            this.highValue = 2
            this.highRank = `Two Pair, ${pairs[0][1].value}s and ${pairs[1][1].value}s`
          } else {
            this.low = pairs[1]
            this.high = [...pairs[0], ...freeCards]
            this.highValue = 1
            this.highRank = `Pair of ${pairs[0][1].value}s`
          }
        }
      }
      const { lowValue, lowRank } = PaigowHand.lowValueAndRank(this.low)
      this.lowValue = lowValue
      this.lowRank = lowRank
      return
    }

    // straights, flushes, straight flushes
    if (straights.length || flush.length || straightFlushes.length) {
      const hasStraightFlush = straightFlushes.length > 0
      const hasFlush = flush.length > 4
      const hasStraight = straights.length > 0
      if (trips.length) {
        let low = []
        let high = []
        let target = null
        if (hasStraightFlush) {
          if (trips[0][0].isJoker()) {
            high = straightFlushes.find(sf => !sf.find(sfCard => sfCard.isJoker()))
            if (!high) {
              high = straightFlushes.slice(-1)[0]
            }
          } else {
            high = straightFlushes[0]
          }
          this.highValue = 8
          const [first, last] = identifyStraightValue(high)
          this.highRank = `Straight Flush, ${first} to ${last}`
          if (this.highRank = 'Straight Flush, Ace to 10') { this.highRank = 'Royal Flush' }
          low = this.hand.filter(c => !high.find(sfCard => Card.equals(sfCard, c)))
        } else if (hasFlush) {
          high = flush.slice(-5)
          this.highValue = 5
          this.highRank = `Flush, ${high[0].isJoker() ? 'Ace' : high[0].value} High`
          low = this.hand.filter(c => !high.find(fCard => Card.equals(fCard, c)))
        } else {
          target = trips[0][2]
          low = trips[0].slice(0, 2)
          if (trips[0][0].isJoker()) {
            high = straights.find(s => (
              s.every(c => !c.isJoker()) && s.some(c => Card.equals(c, target))
            ))
            if (!high) {
              high = straights.slice(-1)[0]
              low = this.hand.filter(c => !high.find(sCard => Card.equals(sCard, c)))
            }
          } else {
            high = straights.find(s => (
              s.some(c => Card.equals(c, target))
            ))
          }
          this.highValue = 4
          const [first, last] = identifyStraightValue(high)
          this.highRank = `Straight, ${first} to ${last}`
        }
        this.low = low
        this.high = high
      } else {
        const hasPair = pairs.length > 0
        const pair0 = hasPair ? pairs[0][0] : null
        const pair1 = hasPair ? pairs[0][1] : null
        let low = []
        let high = []
        let sfLow = []
        let sfHigh = []
        let fLow = []
        let fHigh = []
        let sLow = []
        let sHigh = []
        let setWithPair = false
        if (hasStraightFlush) {
          if (hasPair) {
            const cleanSF = straightFlushes.find(sf => sf.every(c => !Card.equals(c, pair0) && !Card.equals(c, pair1)))
            if (cleanSF) {
              low = pairs[0]
              high = cleanSF
              this.highValue = 8
              const [first, last] = identifyStraightValue(high)
              this.highRank = `Straight Flush, ${first} to ${last}`
              if (this.highRank = 'Straight Flush, Ace to 10') { this.highRank = 'Royal Flush' }
              setWithPair = true
            }
          }
          sfHigh = straightFlushes.slice(-1)[0]
          if (sfHigh[4].isJoker() && sfHigh[0].value !== 'Ace') {
            sfHigh = [sfHigh[4], ...sfHigh.slice(0, 4)]
          } else if (sfHigh[0].isJoker() && sfHigh[4].value === 2) {
            sfHigh = [...sfHigh.slice(1), sfHigh[0]]
          }
          sfLow = this.hand.filter(c => !sfHigh.find(sfCard => Card.equals(sfCard, c)))
        }
        if (hasFlush && !setWithPair) {
          if (hasPair) {
            const cleanF = flush.filter(c => !Card.equals(c, pair0) && !Card.equals(c, pair1))
            if (cleanF.length > 4) {
              low = pairs[0]
              high = cleanF
              this.highValue = 5
              this.highRank = `Flush, ${high[0].isJoker() ? 'Ace' : high[0].value} High`
              setWithPair = true
            }
          }
          fHigh = flush.slice(-5)
          fLow = this.hand.filter(c => !fHigh.find(fCard => Card.equals(fCard, c)))
        }
        if (hasStraight && !setWithPair) {
          if (hasPair) {
            const cleanS = straights.find(s => s.every(c => !Card.equals(c, pair0) && !Card.equals(c, pair1)))
            if (cleanS) {
              low = pairs[0]
              high = cleanS
              this.highValue = 4
              const [first, last] = identifyStraightValue(high)
              this.highRank = `Straight, ${first} to ${last}`
              setWithPair = true
            }
          }
          const straightsReverse = [...straights].reverse()
          const straightNoJoker = straightsReverse.find(s => s.every(c => !c.isJoker()))
          sHigh = straightNoJoker || straights.slice(-1)[0]
          if (sHigh[4].isJoker() && sHigh[0].value !== 'Ace') {
            sHigh = [sHigh[4], ...sHigh.slice(0, 4)]
          } else if (sHigh[0].isJoker() && sHigh[4].value === 2) {
            sHigh = [...sHigh.slice(1), sHigh[0]]
          }
          sLow = this.hand.filter(c => !sHigh.find(sCard => Card.equals(sCard, c)))
        }
        if (!setWithPair) {
          if (hasStraightFlush) {
            low = sfLow
            high = sfHigh
            this.highValue = 8
            const [first, last] = identifyStraightValue(high)
            this.highRank = `Straight Flush, ${first} to ${last}`
            if (this.highRank = 'Straight Flush, Ace to 10') { this.highRank = 'Royal Flush' }
          }
          if (hasFlush) {
            if (!low.length
              || (fLow[0].numericValue() > low[0].numericValue())
              || (fLow[0].numericValue() === low[0].numericValue() && fLow[1].numericValue() > low[1].numericValue())) {
              low = fLow
              high = fHigh
              this.highValue = 5
              this.highRank = `Flush, ${high[0].isJoker() ? 'Ace' : high[0].value} High`
            }
          }
          if (hasStraight) {
            if (!low.length
              || (sLow[0].numericValue() > low[0].numericValue())
              || (sLow[0].numericValue() === low[0].numericValue() && sLow[1].numericValue() > low[1].numericValue())) {
              low = sLow
              high = sHigh
              this.highValue = 4
              const [first, last] = identifyStraightValue(high)
              this.highRank = `Straight, ${first} to ${last}`
            }
          }
        }
        this.low = low
        this.high = high
      }
      const { lowValue, lowRank } = PaigowHand.lowValueAndRank(this.low)
      this.lowValue = lowValue
      this.lowRank = lowRank
      return
    }

    // 3 of a kind
    if (trips.length) {
      if (trips.length === 2) {
        const availableCards = PaigowHand.sortCards([...freeCards, trips[0][2]])
        this.low = trips[0].slice(0, 2)
        this.high = [...trips[1], ...availableCards]
        this.highValue = 3
        this.highRank = `Set of ${trips[1][2].value}s`
      } else {
        if (trips[0][0].numericValue() > 13) {
          this.low = [trips[0][0], freeCards[0]]
          this.high = [...trips[0].slice(1), ...freeCards.slice(1)]
          this.highValue = 1
          this.highRank = `Pair of ${trips[0][2].value}s`
        } else {
          this.low = freeCards.slice(0, 2)
          this.high = [...trips[0], ...freeCards.slice(2)]
          this.highValue = 3
          this.highRank = `Set of ${trips[0][2].value}s`
        }
      }
      const { lowValue, lowRank } = PaigowHand.lowValueAndRank(this.low)
      this.lowValue = lowValue
      this.lowRank = lowRank
      return
    }

    // one pair
    if (pairs.length === 1) {
      this.low = freeCards.slice(0, 2)
      this.high = [...pairs[0], ...freeCards.slice(2)]
      const { lowValue, lowRank } = PaigowHand.lowValueAndRank(this.low)
      this.lowValue = lowValue
      this.lowRank = lowRank
      this.highValue = 1
      this.highRank = `Pair of ${pairs[0][1].value}s`
      return
    }
  },
  setFaceUp: function (dealerHand) {
    dealerHand.setHouseWay()
    let candidateHands = []
    for (let i = 0; i < 7; i++) {
      for (let j = i + 1; j < 7; j++) {
        const low = [this.hand[i], this.hand[j]]
        const high = this.hand.filter((c, idx) => (idx !== i && idx !== j))
        PaigowHand.sortCards(low)
        PaigowHand.sortCards(high)
        candidateHands.push({ low, high })
      }
    }

    candidateHands = candidateHands.filter(hand => !PaigowHand.isFoulHand(hand.low, hand.high))
    const winningHands = []
    const pushingHands = []
    const losingHands = []
    candidateHands.forEach(hand => {
      const lowResult = PaigowHand.compareLowHand(hand.low, dealerHand.low)
      const highResult = PaigowHand.compareHighHand(hand.high, dealerHand.high)
      if (lowResult === 'PLAYER' && highResult === 'PLAYER') {
        winningHands.push(hand)
      } else if (lowResult != highResult) {
        pushingHands.push(hand)
      } else {
        losingHands.push(hand)
      }
    })

    let finalHand = { low: [], high: [] }
    if (winningHands.length) {
      finalHand = winningHands[0]
    } else if (pushingHands.length) {
      finalHand = pushingHands[0]
    } else {
      finalHand = losingHands[0]
    }

    const { lowValue, lowRank } = PaigowHand.lowValueAndRank(finalHand.low)
    const { highValue, highRank, result } = PaigowHand.highValueAndRank(finalHand.high)
    this.low = finalHand.low
    this.lowValue = lowValue
    this.lowRank = lowRank
    this.high = finalHand.high
    this.highValue = highValue
    this.highRank = highRank
    this.aceHigh = result.paigow === 'Joker' || result.paigow === 'Ace'
  },
  fortuneBonus: {
    'Straight': 2,
    '3 of a Kind': 3,
    'Flush': 4,
    'Full House': 5,
    '4 of a Kind:': 25,
    'Straight Flush': 50,
    'Royal Flush': 150,
    'Five Aces': 400,
    '7 Card Straight Flush (Joker)': 1000,
    'Royal Flush Plus Royal Match': 2000,
    '7 Card Straight Flush (Natural)': 8000
  },
  envyBonus: {
    '4 of a Kind': 5,
    'Straight Flush': 20,
    'Royal Flush': 50,
    'Five Aces': 250,
    '7 Card Straight Flush (Joker)': 500,
    'Royal Flush Plus Royal Match': 1000,
    '7 Card Straight Flush (Natural)': 5000
  }
}

export default PaigowHand
