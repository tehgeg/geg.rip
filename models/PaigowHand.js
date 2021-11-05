import Card from './Card'

function PaigowHand(cards = []) {
  this.hand = cards
  this.low = []
  this.high = []
}

PaigowHand.prototype = {
  checkAceHigh: function () {

  },
  checkFortune: function () {

  },
  sortHand: function () {
    this.hand.sort((a, b) => b.numericValue() - a.numericValue())
  },
  sortHandWithJoker: function (j) {
    this.hand.sort((a, b) => {
      let aVal = a.isJoker() ? (j + 0.5) : a.numericValue()
      let bVal = b.isJoker() ? (j + 0.5) : b.numericValue()
      return bVal - aVal
    })
  },
  identifyHand: function () {
    this.sortHand()

    let prevCard = new Card('', 0)
    let paigow = ''
    const pairs = []
    const trips = []
    const quads = []
    const hasJoker = this.hand[0].isJoker()
    const fiveAces = false
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
            dupStraights.push([...s.slice(0, -1), card])
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

      let highVal = (this.hand[1].numericValue() + 1) > 14 ? 14 : (this.hand[1].numericValue() + 1)
      let lowVal = (this.hand[6].numericValue() - 1) < 2 ? 2 : (this.hand[6].numericValue() - 1)
      for (let jokerValue = lowVal; jokerValue <= highVal; jokerValue++) {
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
  setHouseWay: function () { },
  setFaceUpOptimal: function (dealerHand) {

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
