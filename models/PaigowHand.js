import Card from './Card'

function PaigowHand(cards = []) {
  this.hand = cards
  this.low = []
  this.high = []
  this.aceHigh = false
}

PaigowHand.sortCards = (cards) => (
  cards.sort((a, b) => b.numericValue() - a.numericValue())
)

PaigowHand.prototype = {
  checkAceHigh: function () {

  },
  checkFortune: function () {

  },
  hasJoker: function () {
    return this.hand.some(c => c.isJoker())
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
  sortHandWithJoker: function (j) {
    this.hand.sort((a, b) => {
      let aVal = a.isJoker() ? (j + 0.5) : a.numericValue()
      let bVal = b.isJoker() ? (j + 0.5) : b.numericValue()
      return bVal - aVal
    })
  },
  identifyHand: function () {
    const isRepeatDup = (straight, dups) => {
      return dups.some((dup) => {
        if (dup.length !== straight.length) { return false }
        return dup.every((card, idx) => {
          return card.value === straight[idx].value && card.suit === straight[idx].suit
        })
      })
    }

    this.sortHand()

    let prevCard = new Card('', 0)
    let paigow = ''
    const pairs = []
    const trips = []
    let quads = []
    const hasJoker = this.hasJoker()
    let fiveAces = false
    let currentMatchCount = 1
    let straights = []
    let jokerStraights = []
    let jokerWheels = []
    const flushCount = { Clubs: 0, Diamonds: 0, Hearts: 0, Spades: 0 }
    let flush = []
    let straightFlushes = []

    this.hand.forEach((card, index, arr) => {
      if (!card.isJoker()) {
        flushCount[card.suit] += 1

        if (prevCard.value === card.value) {
          currentMatchCount++
          if (index === 6) {
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
      flush = this.hand.filter((card) => card.suit === 'Clubs')
    } else if (flushCount.Diamonds > 3) {
      flush = this.hand.filter((card) => card.suit === 'Diamonds')
    } else if (flushCount.Hearts > 3) {
      flush = this.hand.filter((card) => card.suit === 'Hearts')
    } else if (flushCount.Spades > 3) {
      flush = this.hand.filter((card) => card.suit === 'Spades')
    }

    const wheels = []
    straights.forEach((s) => {
      if (s.length === 4 && s[3].numericValue() === 2) {
        const aceIndices = this.hand.reduce((list, card, idx) => (
          card.numericValue() === 14 ? [...list, idx] : list
        ), [])
        aceIndices.forEach((aceIdx) => {
          wheels.push([...s, this.hand[aceIdx]])
        })
      }
    })
    straights = straights.filter((s) => (
      s.length > 4
    )).concat(wheels)

    let quadAcesJoker = false;
    let tripAcesJoker = false;
    if (hasJoker) {
      const joker = this.hand[0]
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
        const aceIndex = this.hand.findIndex((c) => c.value === 'Ace')
        if (aceIndex > -1) {
          pairs.unshift([joker, this.hand[aceIndex]])
        }
      }

      if (flush.length) {
        flush.unshift(this.hand[0])
      }

      let lowVal = (this.hand[6].numericValue() - 1) < 2 ? 2 : (this.hand[6].numericValue() - 1)
      for (let jokerValue = lowVal; jokerValue <= 14; jokerValue++) {
        this.sortHandWithJoker(jokerValue)

        jokerStraights = []
        this.hand.forEach((card) => {
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
              jokerWheels.push([...s, this.hand.find((c) => c.isJoker())])
            }
          })
        } else {
          jokerStraights.forEach((s) => {
            if (s.length === 4 && s.some((c) => c.isJoker()) && (s[3].numericValue() === 2 || (s[3].isJoker() && jokerValue === 2))) {
              const aceIndices = this.hand.reduce((list, card, idx) => (
                card.numericValue() === 14 ? [...list, idx] : list
              ), [])
              aceIndices.forEach((aceIdx) => {
                jokerWheels.push([...s, this.hand[aceIdx]])
              })
            }
          })
        }

        jokerStraights = jokerStraights.filter((s) => (
          s.length > 4 && s.some((c) => c.isJoker())
        )).concat(jokerWheels)
        straights = [...straights, ...jokerStraights]
      }
      this.sortHand()
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
      paigow = this.hand[0].value
    }

    return {
      paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes,
    }
  },
  // ruleset -> https://wizardofodds.com/games/pai-gow-poker/house-way/trump-plaza-atlantic-city/
  setHouseWay: function () {
    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = this.identifyHand()
    const freeCards = this.freeCards(quads, trips, pairs)

    // paigow
    if (paigow) {
      if (paigow === 'Joker' || paigow === 'Ace') {
        this.aceHigh = true
      }
      this.low = [this.hand[1], this.hand[2]]
      this.high = [this.hand[0], ...this.hand.slice(3)]
      return
    }

    // five aces
    if (fiveAces) {
      this.low = pairs.length && pairs[0][0].value === 'King' ? this.hand.slice(-2) : this.hand.slice(0, 2)
      this.high = this.hand.slice(0, 5)
      return
    }

    // quads
    if (quads.length) {
      if (trips.length) {
        this.low = trips[0].slice(0, 2)
        this.high = [...quads[0], trips[0][2]]
      } else if (pairs.length) {
        this.low = pairs[0]
        this.high = [...quads[0], ...freeCards]
      } else {
        const quadValue = quads[0][0].numericValue()
        if (quadValue < 7) {
          this.low = quads[0].slice(-2)
          this.high = [...quads[0].slice(0, 2), ...freeCards]
        } else if (quadValue > 6 && quadValue < 11) {
          if (freeCards[0].numericValue() > 12) {
            this.low = freeCards.slice(0, 2)
            this.high = [...quads, ...freeCards.slice(2)]
          } else {
            this.low = quads[0].slice(-2)
            this.high = [...quads[0].slice(0, 2), ...freeCards]
          }
        } else if (quadValue > 10 && quadValue < 14) {
          if (freeCards[0].numericValue() > 13) {
            this.low = freeCards.slice(0, 2)
            this.high = [...quads, ...freeCards.slice(2)]
          } else {
            this.low = quads[0].slice(-2)
            this.high = [...quads[0].slice(0, 2), ...freeCards]
          }
        } else {
          this.low = quads[0].slice(-2)
          this.high = [...quads[0].slice(0, 2), ...freeCards]
        }
      }
      return
    }

    // boats
    if (trips.length && pairs.length) {
      if (trips.length > 1) {
        const availableCards = PaigowHand.sortCards([...freeCards, trips[0][2]])
        this.low = trips[0].slice(0, 2)
        this.high = [...trips[1], ...availableCards]
      } else if (pairs.length > 1) {
        this.low = pairs[0]
        this.high = [...trips[0], ...pairs[1]]
      } else {
        if (pairs[0][0].value === 2 && freeCards[0].numericValue() > 13 && freeCards[1].numericValue() > 12) {
          this.low = freeCards
          this.high = [...trips[0], ...pairs[0]]
        } else {
          this.low = pairs[0]
          this.high = [...trips[0], ...freeCards]
        }
      }
      return
    }

    // three pair
    if (pairs.length === 3) {
      this.low = pairs[0]
      this.high = [...pairs[1], ...pairs[2], ...freeCards]
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
      } else {
        const pair1Rank = pairRank(pairs[0][0].numericValue())
        const pair2Rank = pairRank(pairs[1][0].numericValue())
        const pairRanks = pair1Rank + pair2Rank
        if (['HH', 'HM', 'MH'].includes(pairRanks)) {
          this.low = pairs[1]
          this.high = [...pairs[0], ...freeCards]
        } else if (['MM', 'HL', 'LH'].includes(pairRanks)) {
          if (freeCards[0].numericValue() > 13) {
            this.low = freeCards.slice(0, 2)
            this.high = [...pairs[0], ...pairs[1], ...freeCards.slice(-1)]
          } else {
            this.low = pairs[1]
            this.high = [...pairs[0], ...freeCards]
          }
        } else {
          if (freeCards[0].numericValue() > 12) {
            this.low = freeCards.slice(0, 2)
            this.high = [...pairs[0], ...pairs[1], ...freeCards.slice(-1)]
          } else {
            this.low = pairs[1]
            this.high = [...pairs[0], ...freeCards]
          }
        }
      }
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
          low = this.hand.filter(c => !high.find(sfCard => Card.equals(sfCard, c)))
        } else if (hasFlush) {
          high = flush.slice(-5)
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
              setWithPair = true
            }
          }
          sfHigh = straightFlushes.slice(-1)[0]
          sfLow = this.hand.filter(c => !sfHigh.find(sfCard => Card.equals(sfCard, c)))
        }
        if (hasFlush && !setWithPair) {
          if (hasPair) {
            const cleanF = flush.filter(c => !Card.equals(c, pair0) && !Card.equals(c, pair1))
            if (cleanF.length > 4) {
              low = pairs[0]
              high = cleanF
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
              setWithPair = true
            }
          }
          sHigh = straights.slice(-1)[0]
          sLow = this.hand.filter(c => !sHigh.find(sCard => Card.equals(sCard, c)))
        }
        if (!setWithPair) {
          if (hasStraightFlush) {
            low = sfLow
            high = sfHigh
          }
          if (hasFlush) {
            if (!low.length
              || (fLow[0].numericValue() > low[0].numericValue())
              || (fLow[0].numericValue() === low[0].numericValue() && fLow[1].numericValue() > low[1].numericValue())) {
              low = fLow
              high = fHigh
            }
          }
          if (hasStraight) {
            if (!low.length
              || (sLow[0].numericValue() > low[0].numericValue())
              || (sLow[0].numericValue() === low[0].numericValue() && sLow[1].numericValue() > low[1].numericValue())) {
              low = sLow
              high = sHigh
            }
          }
        }
        this.low = low
        this.high = high
      }
      return
    }

    // 3 of a kind
    if (trips.length) {
      if (trips.length === 2) {
        const availableCards = PaigowHand.sortCards([...freeCards, trips[0][2]])
        this.low = trips[0].slice(0, 2)
        this.high = [...trips[1], ...availableCards]
      } else {
        if (trips[0][0].numericValue() > 13) {
          this.low = [trips[0][0], freeCards[0]]
          this.high = [...trips[0].slice(1), ...freeCards.slice(1)]
        } else {
          this.low = freeCards.slice(0, 2)
          this.high = [...trips[0], ...freeCards.slice(2)]
        }
      }
      return
    }

    // one pair
    if (pairs.length === 1) {
      this.low = freeCards.slice(0, 2)
      this.high = [...pairs[0], ...freeCards.slice(2)]
      return
    }
  },
  setFaceUpOptimal: function (dealerHand) { },
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
