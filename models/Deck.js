import Card from './Card.js'

function Deck(jokers = 0) {
  this.cards = []
  this.dealIndex = 0
  const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
  const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']

  for (const suit of suits) {
    for (const value of values) {
      this.cards.push(new Card(suit, value))
    }
  }

  for (let i = 0; i < jokers; i++) {
    this.cards.push(new Card('', 'Joker'))
  }
}

Deck.prototype = {
  shuffle: function () {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let swapIndex = Math.floor(Math.random() * (i + 1))
      const swap = this.cards[swapIndex]
      this.cards[swapIndex] = this.cards[i]
      this.cards[i] = swap
    }
    this.dealIndex = 0
  },
  spread: function () {
    return this.cards.slice(this.dealIndex)
  },
  deal: function (cardCount) {
    const cards = this.cards.slice(this.dealIndex, this.dealIndex + cardCount)
    this.dealIndex += cardCount
    return cards
  }
}

export default Deck
