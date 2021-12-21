import Card from "../models/Card"
import PaigowHand from "../models/PaigowHand"

describe('Paigow Tests', () => {
  test('9 High Paigow', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 8),
      new Card('Clubs', 2),
      new Card('Hearts', 4),
      new Card('Spades', 3),
      new Card('Hearts', 6),
      new Card('Diamonds', 9),
      new Card('Spades', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe(9)
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('10 High Paigow', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 8),
      new Card('Clubs', 2),
      new Card('Hearts', 4),
      new Card('Spades', 3),
      new Card('Hearts', 6),
      new Card('Diamonds', 10),
      new Card('Spades', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe(10)
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Jack High Paigow', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 8),
      new Card('Clubs', 2),
      new Card('Hearts', 4),
      new Card('Spades', 3),
      new Card('Hearts', 6),
      new Card('Diamonds', 9),
      new Card('Spades', 'Jack')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('Jack')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Queen High Paigow', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 8),
      new Card('Clubs', 2),
      new Card('Hearts', 'Queen'),
      new Card('Spades', 3),
      new Card('Hearts', 6),
      new Card('Diamonds', 9),
      new Card('Spades', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('Queen')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('King High Paigow', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 8),
      new Card('Clubs', 'King'),
      new Card('Hearts', 4),
      new Card('Spades', 3),
      new Card('Hearts', 6),
      new Card('Diamonds', 9),
      new Card('Spades', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('King')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Ace High Paigow', () => {
    const hand = new PaigowHand([
      new Card('Clubs', 'Ace'),
      new Card('Clubs', 2),
      new Card('Hearts', 4),
      new Card('Spades', 3),
      new Card('Hearts', 6),
      new Card('Diamonds', 9),
      new Card('Spades', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('Ace')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Joker High Paigow', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 8),
      new Card('Clubs', 2),
      new Card('Hearts', 4),
      new Card('Spades', 3),
      new Card('', 'Joker'),
      new Card('Diamonds', 9),
      new Card('Spades', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('Joker')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })
})

describe('One Pair Tests', () => {
  test('Pair of 2s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 2),
      new Card('Clubs', 2),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe(2)
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of 3s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 2),
      new Card('Clubs', 3),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe(3)
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of 4s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 4),
      new Card('Clubs', 4),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe(4)
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of 5s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 2),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 5)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe(5)
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of 6s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 6),
      new Card('Clubs', 2),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe(6)
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of 7s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 2),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Spades', 7),
      new Card('Hearts', 7),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe(7)
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of 8s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 2),
      new Card('Clubs', 8),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 8),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe(8)
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of 9s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 10),
      new Card('Clubs', 2),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 9)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe(9)
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of 10s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 7),
      new Card('Clubs', 2),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 10),
      new Card('Diamonds', 9),
      new Card('Spades', 10)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe(10)
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of Jacks', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 'Jack'),
      new Card('Clubs', 2),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe('Jack')
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of Queens', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 2),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 'Queen'),
      new Card('Spades', 'Queen'),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe('Queen')
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of Kings', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 2),
      new Card('Clubs', 'King'),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe('King')
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of Aces', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 'Ace'),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 6),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe('Ace')
    expect(pairs[0][0].value).toBe(pairs[0][1].value)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of Ace + Joker', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 'Ace'),
      new Card('Clubs', 2),
      new Card('', 'Joker'),
      new Card('Spades', 3),
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 9),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(pairs[0].length).toBe(2)
    expect(pairs[0][0].value).toBe('Joker')
    expect(pairs[0][1].value).toBe('Ace')
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })
})

describe('3 of a Kind Tests', () => {
  test('Set of 9s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 9),
      new Card('Clubs', 9),
      new Card('Hearts', 9),
      new Card('Spades', 3),
      new Card('Hearts', 10),
      new Card('Diamonds', 'Queen'),
      new Card('Spades', 'Ace')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(trips[0].length).toBe(3)
    expect(trips[0][0].value).toBe(9)
    expect(trips[0][1].value).toBe(9)
    expect(trips[0][2].value).toBe(9)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of Aces + Joker', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 'Ace'),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 2),
      new Card('', 'Joker'),
      new Card('Hearts', 8),
      new Card('Diamonds', 6),
      new Card('Spades', 9)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(trips[0].length).toBe(3)
    expect(trips[0][0].value).toBe('Joker')
    expect(trips[0][1].value).toBe('Ace')
    expect(trips[0][2].value).toBe('Ace')
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Set of 8s and Set of 4s', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 8),
      new Card('Clubs', 4),
      new Card('Hearts', 4),
      new Card('Diamonds', 4),
      new Card('Hearts', 8),
      new Card('Diamonds', 'King'),
      new Card('Spades', 8)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(2)
    expect(trips[0].length).toBe(3)
    expect(trips[1].length).toBe(3)
    expect(trips[0][0].value).toBe(8)
    expect(trips[0][1].value).toBe(8)
    expect(trips[0][2].value).toBe(8)
    expect(trips[1][0].value).toBe(4)
    expect(trips[1][1].value).toBe(4)
    expect(trips[1][2].value).toBe(4)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Set of 7s and Pair of Aces + Joker', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 7),
      new Card('Clubs', 7),
      new Card('Hearts', 7),
      new Card('Diamonds', 'Ace'),
      new Card('Hearts', 'Ace'),
      new Card('Diamonds', 5),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(2)
    expect(trips[0].length).toBe(3)
    expect(trips[1].length).toBe(3)
    expect(trips[0][0].value).toBe('Joker')
    expect(trips[0][1].value).toBe('Ace')
    expect(trips[0][2].value).toBe('Ace')
    expect(trips[1][0].value).toBe(7)
    expect(trips[1][1].value).toBe(7)
    expect(trips[1][2].value).toBe(7)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })
})

describe('Straight Tests', () => {
  test('Natural 5 Card', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Spades', 7),
      new Card('Hearts', 8),
      new Card('Diamonds', 'Jack'),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(1)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe(8)
    expect(straights[0][4].value).toBe(4)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 6 Card', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Spades', 7),
      new Card('Hearts', 8),
      new Card('Diamonds', 'Jack'),
      new Card('Spades', 3)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(2)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe(8)
    expect(straights[0][4].value).toBe(4)
    expect(straights[1][0].value).toBe(7)
    expect(straights[1][4].value).toBe(3)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 7 Card', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Spades', 7),
      new Card('Hearts', 8),
      new Card('Diamonds', 2),
      new Card('Spades', 3)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(3)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe(8)
    expect(straights[0][4].value).toBe(4)
    expect(straights[1][0].value).toBe(7)
    expect(straights[1][4].value).toBe(3)
    expect(straights[2][0].value).toBe(6)
    expect(straights[2][4].value).toBe(2)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 5 Card with Pair', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 6),
      new Card('Clubs', 7),
      new Card('Hearts', 8),
      new Card('Spades', 8),
      new Card('Hearts', 9),
      new Card('Diamonds', 10),
      new Card('Spades', 'Ace')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(2)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe(10)
    expect(straights[0][4].value).toBe(6)
    expect(straights[1][0].value).toBe(10)
    expect(straights[1][4].value).toBe(6)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 5 Card with Two Pair', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 6),
      new Card('Clubs', 7),
      new Card('Hearts', 8),
      new Card('Spades', 8),
      new Card('Hearts', 9),
      new Card('Diamonds', 10),
      new Card('Spades', 10)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(2)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(4)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe(10)
    expect(straights[0][4].value).toBe(6)
    expect(straights[1][0].value).toBe(10)
    expect(straights[1][4].value).toBe(6)
    expect(straights[2][0].value).toBe(10)
    expect(straights[2][4].value).toBe(6)
    expect(straights[3][0].value).toBe(10)
    expect(straights[3][4].value).toBe(6)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 5 Card with 3 of a Kind', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 6),
      new Card('Clubs', 7),
      new Card('Hearts', 8),
      new Card('Spades', 8),
      new Card('Diamonds', 8),
      new Card('Diamonds', 9),
      new Card('Spades', 10)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(3)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe(10)
    expect(straights[0][4].value).toBe(6)
    expect(straights[1][0].value).toBe(10)
    expect(straights[1][4].value).toBe(6)
    expect(straights[2][0].value).toBe(10)
    expect(straights[2][4].value).toBe(6)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 6 Card with Pair', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 6),
      new Card('Clubs', 7),
      new Card('Hearts', 8),
      new Card('Spades', 8),
      new Card('Diamonds', 9),
      new Card('Diamonds', 10),
      new Card('Spades', 'Jack')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(4)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe('Jack')
    expect(straights[0][4].value).toBe(7)
    expect(straights[1][0].value).toBe('Jack')
    expect(straights[1][4].value).toBe(7)
    expect(straights[2][0].value).toBe(10)
    expect(straights[2][4].value).toBe(6)
    expect(straights[3][0].value).toBe(10)
    expect(straights[3][4].value).toBe(6)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Two Natural Two Card + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 2),
      new Card('Diamonds', 6),
      new Card('Clubs', 7),
      new Card('', 'Joker'),
      new Card('Spades', 9),
      new Card('Diamonds', 10),
      new Card('Diamonds', 'Queen'),
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(1)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe(10)
    expect(straights[0][4].value).toBe(6)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('3 Natural Two Card + Joker', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 6),
      new Card('Clubs', 7),
      new Card('', 'Joker'),
      new Card('Spades', 9),
      new Card('Diamonds', 10),
      new Card('Diamonds', 'Queen'),
      new Card('Spades', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(2)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe('King')
    expect(straights[0][4].value).toBe(9)
    expect(straights[1][0].value).toBe(10)
    expect(straights[1][4].value).toBe(6)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 3 Card + Joker -> 5 Card Straight', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 6),
      new Card('Clubs', 7),
      new Card('Hearts', 8),
      new Card('', 'Joker'),
      new Card('Diamonds', 10),
      new Card('Diamonds', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(1)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe(10)
    expect(straights[0][4].value).toBe(6)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 3 Card + Joker -> 6 Card Straight', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 6),
      new Card('Clubs', 7),
      new Card('Hearts', 8),
      new Card('', 'Joker'),
      new Card('Diamonds', 10),
      new Card('Diamonds', 'Jack')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(2)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe('Jack')
    expect(straights[0][4].value).toBe(7)
    expect(straights[1][0].value).toBe(10)
    expect(straights[1][4].value).toBe(6)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Two Natural 3 Card + Joker -> 7 Card Straight', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('', 'Joker'),
      new Card('Hearts', 7),
      new Card('Diamonds', 8),
      new Card('Diamonds', 9)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(3)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe(9)
    expect(straights[0][4].value).toBe(5)
    expect(straights[1][0].value).toBe(8)
    expect(straights[1][4].value).toBe(4)
    expect(straights[2][0].value).toBe(7)
    expect(straights[2][4].value).toBe(3)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Two Natural 3 Card + Joker -> No Straight (Joker High Paigow)', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('', 'Joker'),
      new Card('Hearts', 10),
      new Card('Diamonds', 'Queen'),
      new Card('Diamonds', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('Joker')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 4 Card + Joker -> 5 Card Straight', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('', 'Joker'),
      new Card('Diamonds', 'Jack'),
      new Card('Diamonds', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(2)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(straights[0][0].value).toBe('Joker')
    expect(straights[0][4].value).toBe(3)
    expect(straights[1][0].value).toBe(6)
    expect(straights[1][4].value).toBe('Joker')
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 4 Card + Joker -> 6 Card Straight', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('', 'Joker'),
      new Card('Diamonds', 7),
      new Card('Diamonds', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(8)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 4 Card + Joker -> 7 Card Straight', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('', 'Joker'),
      new Card('Diamonds', 7),
      new Card('Diamonds', 8)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(14)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 5 Card + Joker -> 6 Card Straight', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Spades', 7),
      new Card('Clubs', 10),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(8)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 5 Card + Joker -> 7 Card Straight', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Spades', 7),
      new Card('Clubs', 9),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(9)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 6 Card + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Diamonds', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Spades', 7),
      new Card('Clubs', 8),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(14)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Wheel with Pair of Aces', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('Clubs', 2),
      new Card('Hearts', 3),
      new Card('Spades', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(2)
    expect(straights[0][0].value).toBe(5)
    expect(straights[0][4].value).toBe('Ace')
    expect(straights[1][0].value).toBe(5)
    expect(straights[1][4].value).toBe('Ace')
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Wheel with 3 Aces', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 2),
      new Card('Spades', 3),
      new Card('Clubs', 4),
      new Card('Hearts', 5)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(3)
    expect(straights[0][0].value).toBe(5)
    expect(straights[0][4].value).toBe('Ace')
    expect(straights[1][0].value).toBe(5)
    expect(straights[1][4].value).toBe('Ace')
    expect(straights[2][0].value).toBe(5)
    expect(straights[2][4].value).toBe('Ace')
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Wheel with Pair of Aces + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('', 'Joker'),
      new Card('Hearts', 2),
      new Card('Spades', 3),
      new Card('Clubs', 4),
      new Card('Hearts', 5)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(12)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural A-7', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Diamonds', 2),
      new Card('Clubs', 3),
      new Card('Hearts', 4),
      new Card('Spades', 5),
      new Card('Clubs', 6),
      new Card('Hearts', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(3)
    expect(straights[0][0].value).toBe(5)
    expect(straights[0][4].value).toBe('Ace')
    expect(straights[1][0].value).toBe(7)
    expect(straights[1][4].value).toBe(3)
    expect(straights[2][0].value).toBe(6)
    expect(straights[2][4].value).toBe(2)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 2-7 + Joker', () => {
    const hand = new PaigowHand([
      new Card('', 'Joker'),
      new Card('Diamonds', 2),
      new Card('Clubs', 3),
      new Card('Hearts', 4),
      new Card('Spades', 5),
      new Card('Clubs', 6),
      new Card('Hearts', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(14)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural Broadway', () => {
    const hand = new PaigowHand([
      new Card('Clubs', 3),
      new Card('Diamonds', 4),
      new Card('Clubs', 10),
      new Card('Hearts', 'Jack'),
      new Card('Spades', 'Queen'),
      new Card('Clubs', 'King'),
      new Card('Hearts', 'Ace')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(1)
    expect(straights[0][0].value).toBe('Ace')
    expect(straights[0][4].value).toBe(10)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural Broadway + Joker', () => {
    const hand = new PaigowHand([
      new Card('Clubs', 3),
      new Card('', 'Joker'),
      new Card('Clubs', 10),
      new Card('Hearts', 'Jack'),
      new Card('Spades', 'Queen'),
      new Card('Clubs', 'King'),
      new Card('Hearts', 'Ace')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(7)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('K, Q, J, 10 + Joker', () => {
    const hand = new PaigowHand([
      new Card('Clubs', 3),
      new Card('', 'Joker'),
      new Card('Clubs', 10),
      new Card('Hearts', 'Jack'),
      new Card('Spades', 'Queen'),
      new Card('Clubs', 'King'),
      new Card('Hearts', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(2)
    expect(straights[0][0].value).toBe('Joker')
    expect(straights[0][4].value).toBe(10)
    expect(straights[1][0].value).toBe('King')
    expect(straights[1][4].value).toBe('Joker')
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Straight with 5 Card Flush', () => {
    const hand = new PaigowHand([
      new Card('Hearts', 3),
      new Card('Hearts', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Spades', 7),
      new Card('Hearts', 'King'),
      new Card('Hearts', 'Ace')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(1)
    expect(straights[0][0].value).toBe(7)
    expect(straights[0][4].value).toBe(3)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(0)
  })

  test('Straight with 6 Card Flush', () => {
    const hand = new PaigowHand([
      new Card('Hearts', 3),
      new Card('Hearts', 4),
      new Card('Clubs', 5),
      new Card('Hearts', 6),
      new Card('Hearts', 7),
      new Card('Hearts', 'King'),
      new Card('Hearts', 'Ace')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(1)
    expect(straights[0][0].value).toBe(7)
    expect(straights[0][4].value).toBe(3)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(6)
    expect(straightFlushes.length).toBe(0)
  })
})

describe('Flush Tests', () => {
  test('Natural 5 Card Flush', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Spades', 6),
      new Card('Spades', 8),
      new Card('Spades', 9),
      new Card('Spades', 'King'),
      new Card('Hearts', 7),
      new Card('Clubs', 8)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 6 Card Flush', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Spades', 6),
      new Card('Spades', 8),
      new Card('Spades', 9),
      new Card('Spades', 'King'),
      new Card('Spades', 7),
      new Card('Clubs', 'Queen')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(6)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 7 Card Flush', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Spades', 6),
      new Card('Spades', 8),
      new Card('Spades', 9),
      new Card('Spades', 'King'),
      new Card('Spades', 7),
      new Card('Spades', 'Queen')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(7)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 4 Card Flush + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Spades', 6),
      new Card('Spades', 8),
      new Card('Spades', 'King'),
      new Card('', 'Joker'),
      new Card('Hearts', 7),
      new Card('Diamonds', 'Queen')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 5 Card Flush + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Spades', 6),
      new Card('Spades', 8),
      new Card('Spades', 'King'),
      new Card('', 'Joker'),
      new Card('Spades', 7),
      new Card('Diamonds', 'Queen')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(6)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 6 Card Flush + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Spades', 6),
      new Card('Spades', 8),
      new Card('Spades', 'King'),
      new Card('', 'Joker'),
      new Card('Spades', 7),
      new Card('Spades', 'Queen')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(7)
    expect(straightFlushes.length).toBe(0)
  })
})

describe('Full House Tests', () => {
  test('Natural Full House', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Hearts', 3),
      new Card('Diamonds', 8),
      new Card('Spades', 8),
      new Card('Clubs', 8),
      new Card('Spades', 7),
      new Card('Diamonds', 'Queen')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural Full House with additional Pair', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Hearts', 3),
      new Card('Diamonds', 8),
      new Card('Spades', 8),
      new Card('Clubs', 8),
      new Card('Spades', 7),
      new Card('Diamonds', 7)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(2)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural Full House with additional Pair of Ace + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Hearts', 3),
      new Card('Diamonds', 8),
      new Card('Spades', 8),
      new Card('Clubs', 8),
      new Card('Spades', 'Ace'),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(2)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 3 of a Kind with Pair of Ace + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('', 'Joker'),
      new Card('Diamonds', 8),
      new Card('Spades', 8),
      new Card('Clubs', 8),
      new Card('Spades', 'King'),
      new Card('Clubs', 2)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of Aces + Joker with Pair', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('', 'Joker'),
      new Card('Diamonds', 'Ace'),
      new Card('Spades', 8),
      new Card('Clubs', 8),
      new Card('Spades', 'King'),
      new Card('Clubs', 2)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Pair of Aces + Joker with Two Pair', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('', 'Joker'),
      new Card('Diamonds', 'Ace'),
      new Card('Spades', 8),
      new Card('Clubs', 8),
      new Card('Spades', 2),
      new Card('Clubs', 2)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(2)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })
})

describe('4 of a Kind Tests', () => {
  test('Natural 4 of a Kind', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Hearts', 3),
      new Card('Diamonds', 3),
      new Card('Clubs', 3),
      new Card('Clubs', 8),
      new Card('Spades', 7),
      new Card('Diamonds', 'Queen')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 4 of a Kind + Pair', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Hearts', 3),
      new Card('Diamonds', 3),
      new Card('Clubs', 3),
      new Card('Clubs', 8),
      new Card('Spades', 8),
      new Card('Diamonds', 'Queen')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 4 of a Kind with Ace + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Hearts', 3),
      new Card('Diamonds', 3),
      new Card('Clubs', 3),
      new Card('Clubs', 'Ace'),
      new Card('', 'Joker'),
      new Card('Diamonds', 8)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 4 of a Kind with 3 of a Kind', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Hearts', 3),
      new Card('Diamonds', 3),
      new Card('Clubs', 3),
      new Card('Clubs', 8),
      new Card('Spades', 8),
      new Card('Diamonds', 8)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('Natural 4 of a Kind with 3 of Kind being 2 Aces + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Hearts', 3),
      new Card('Diamonds', 3),
      new Card('Clubs', 3),
      new Card('Clubs', 'Ace'),
      new Card('Spades', 'Ace'),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('3 Aces + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Hearts', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('', 'Joker'),
      new Card('Clubs', 'Queen'),
      new Card('Spades', 'King'),
      new Card('Hearts', 4)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('3 Aces + Joker with Pair', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Hearts', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('', 'Joker'),
      new Card('Clubs', 'Queen'),
      new Card('Spades', 'Queen'),
      new Card('Hearts', 4)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('3 Aces + Joker with 3 of a Kind', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Hearts', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('', 'Joker'),
      new Card('Clubs', 'Queen'),
      new Card('Spades', 'Queen'),
      new Card('Hearts', 'Queen')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('3 Aces + Joker with Broadway Cards', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Hearts', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('', 'Joker'),
      new Card('Clubs', 'Queen'),
      new Card('Spades', 'King'),
      new Card('Hearts', 'Jack')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(3)
    expect(straights[0][0].value).toBe('Ace')
    expect(straights[0][4].value).toBe('Joker')
    expect(straights[1][0].value).toBe('Ace')
    expect(straights[1][4].value).toBe('Joker')
    expect(straights[2][0].value).toBe('Ace')
    expect(straights[2][4].value).toBe('Joker')
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('3 Aces + Joker with Wheel Cards', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Hearts', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('', 'Joker'),
      new Card('Clubs', 2),
      new Card('Spades', 3),
      new Card('Hearts', 4)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(3)
    expect(straights[0][0].value).toBe('Joker')
    expect(straights[0][4].value).toBe('Ace')
    expect(straights[1][0].value).toBe('Joker')
    expect(straights[1][4].value).toBe('Ace')
    expect(straights[2][0].value).toBe('Joker')
    expect(straights[2][4].value).toBe('Ace')
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('3 Aces + Joker with Flush', () => {
    const hand = new PaigowHand([
      new Card('Spades', 'Ace'),
      new Card('Hearts', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('', 'Joker'),
      new Card('Diamonds', 2),
      new Card('Diamonds', 7),
      new Card('Diamonds', 10)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(1)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(0)
  })
})

describe('Straight Flush Tests', () => {
  test('Natural 5 Card Straight Flush', () => {
    const hand = new PaigowHand([
      new Card('Spades', 3),
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Hearts', 10),
      new Card('Diamonds', 'Jack')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(1)
    expect(straightFlushes[0][0].value).toBe(7)
    expect(straightFlushes[0][4].value).toBe(3)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Natural 5 Card Straight Flush with Pair', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Spades', 8),
      new Card('Hearts', 10),
      new Card('Diamonds', 10)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(1)
    expect(straightFlushes[0][0].value).toBe(8)
    expect(straightFlushes[0][4].value).toBe(4)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Natural 5 Card Straight Flush with Two Pair', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Spades', 8),
      new Card('Hearts', 7),
      new Card('Diamonds', 8)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(2)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(3)
    expect(straights[0][0].value).toBe(8)
    expect(straights[0][4].value).toBe(4)
    expect(straights[1][0].value).toBe(8)
    expect(straights[1][4].value).toBe(4)
    expect(straights[2][0].value).toBe(8)
    expect(straights[2][4].value).toBe(4)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(1)
    expect(straightFlushes[0][0].value).toBe(8)
    expect(straightFlushes[0][4].value).toBe(4)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Natural 5 Card Straight Flush with 3 of a Kind', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Spades', 8),
      new Card('Hearts', 8),
      new Card('Diamonds', 8)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(2)
    expect(straights[0][0].value).toBe(8)
    expect(straights[0][4].value).toBe(4)
    expect(straights[1][0].value).toBe(8)
    expect(straights[1][4].value).toBe(4)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(1)
    expect(straightFlushes[0][0].value).toBe(8)
    expect(straightFlushes[0][4].value).toBe(4)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Natural 6 Card Straight Flush', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Spades', 8),
      new Card('Spades', 9),
      new Card('Diamonds', 'King')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(6)
    expect(straightFlushes.length).toBe(2)
    expect(straightFlushes[0][0].value).toBe(9)
    expect(straightFlushes[0][4].value).toBe(5)
    expect(straightFlushes[1][0].value).toBe(8)
    expect(straightFlushes[1][4].value).toBe(4)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Natural 6 Card Straight Flush with Pair', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Spades', 8),
      new Card('Spades', 9),
      new Card('Diamonds', 4)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(1)
    expect(straights[0][0].value).toBe(8)
    expect(straights[0][4].value).toBe(4)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(6)
    expect(straightFlushes.length).toBe(2)
    expect(straightFlushes[0][0].value).toBe(9)
    expect(straightFlushes[0][4].value).toBe(5)
    expect(straightFlushes[1][0].value).toBe(8)
    expect(straightFlushes[1][4].value).toBe(4)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Natural 7 Card Straight Flush', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Spades', 8),
      new Card('Spades', 9),
      new Card('Spades', 10)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(7)
    expect(straightFlushes.length).toBe(3)
    expect(straightFlushes[0][0].value).toBe(10)
    expect(straightFlushes[0][4].value).toBe(6)
    expect(straightFlushes[1][0].value).toBe(9)
    expect(straightFlushes[1][4].value).toBe(5)
    expect(straightFlushes[2][0].value).toBe(8)
    expect(straightFlushes[2][4].value).toBe(4)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Natural 5 Card Straight Flush + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Spades', 8),
      new Card('Hearts', 'King'),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(6)
    expect(straightFlushes.length).toBe(8)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Natural 6 Card Straight Flush + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Spades', 8),
      new Card('Spades', 9),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(7)
    expect(straightFlushes.length).toBe(14)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Natural 4 Card Straight Flush + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Clubs', 'Jack'),
      new Card('Diamonds', 'Queen'),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(2)
    expect(straightFlushes[0][0].value).toBe('Joker')
    expect(straightFlushes[0][4].value).toBe(4)
    expect(straightFlushes[1][0].value).toBe(7)
    expect(straightFlushes[1][4].value).toBe('Joker')
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Two Natural 3 Card Straight Flushes + Joker', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 8),
      new Card('Spades', 9),
      new Card('Spades', 10),
      new Card('', 'Joker')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(7)
    expect(straightFlushes.length).toBe(3)
    expect(straightFlushes[0][0].value).toBe(10)
    expect(straightFlushes[0][4].value).toBe(6)
    expect(straightFlushes[1][0].value).toBe(9)
    expect(straightFlushes[1][4].value).toBe(5)
    expect(straightFlushes[2][0].value).toBe(8)
    expect(straightFlushes[2][4].value).toBe(4)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('5 Card Straight Flush with Regular 5 Card Straights', () => {
    const hand = new PaigowHand([
      new Card('Spades', 4),
      new Card('Spades', 5),
      new Card('Spades', 6),
      new Card('Spades', 7),
      new Card('Spades', 8),
      new Card('Clubs', 8),
      new Card('Hearts', 9)
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(3)
    expect(straights[0][0].value).toBe(9)
    expect(straights[0][4].value).toBe(5)
    expect(straights[1][0].value).toBe(9)
    expect(straights[1][4].value).toBe(5)
    expect(straights[2][0].value).toBe(8)
    expect(straights[2][4].value).toBe(4)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(1)
    expect(straightFlushes[0][0].value).toBe(8)
    expect(straightFlushes[0][4].value).toBe(4)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })

  test('Royal Flush with Pair of Aces (God Hand A)', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 10),
      new Card('Diamonds', 'Jack'),
      new Card('Diamonds', 'Queen'),
      new Card('Diamonds', 'King'),
      new Card('Diamonds', 'Ace'),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 'Ace')
    ])

    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(1)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(false)
    expect(straights.length).toBe(2)
    expect(straights[0][0].value).toBe('Ace')
    expect(straights[0][4].value).toBe(10)
    expect(straights[1][0].value).toBe('Ace')
    expect(straights[1][4].value).toBe(10)
    expect(straights.every(s => s.length === 5)).toBe(true)
    expect(flush.length).toBe(5)
    expect(straightFlushes.length).toBe(1)
    expect(straightFlushes[0][0].value).toBe('Ace')
    expect(straightFlushes[0][4].value).toBe(10)
    expect(straightFlushes.every(s => s.length === 5)).toBe(true)
  })
})

describe('5 Aces Tests', () => {
  test('4 Aces + Joker', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 10),
      new Card('Diamonds', 'Jack'),
      new Card('', 'Joker'),
      new Card('Spades', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 'Ace')
    ])
  
    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(0)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(true)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('4 Aces + Joker with Pair', () => {
    const hand = new PaigowHand([
      new Card('Hearts', 'Jack'),
      new Card('Diamonds', 'Jack'),
      new Card('', 'Joker'),
      new Card('Spades', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 'Ace')
    ])
  
    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(true)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })

  test('4 Aces + Joker with KK (God Hand B)', () => {
    const hand = new PaigowHand([
      new Card('Diamonds', 'King'),
      new Card('Spades', 'King'),
      new Card('', 'Joker'),
      new Card('Spades', 'Ace'),
      new Card('Diamonds', 'Ace'),
      new Card('Clubs', 'Ace'),
      new Card('Hearts', 'Ace')
    ])
  
    const { paigow, pairs, trips, quads, fiveAces, straights, flush, straightFlushes } = hand.identifyHand()
    expect(paigow).toBe('')
    expect(pairs.length).toBe(1)
    expect(trips.length).toBe(0)
    expect(quads.length).toBe(0)
    expect(fiveAces).toBe(true)
    expect(straights.length).toBe(0)
    expect(flush.length).toBe(0)
    expect(straightFlushes.length).toBe(0)
  })
})
