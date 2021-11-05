function Card(suit, value) {
  this.suit = suit
  this.value = value
}

Card.equals = function(c1, c2) {
  return c1.value === c2.value && c1.suit === c2.suit
}

Card.prototype = {
  abbreviation: function () {
    return this.isJoker() ? 'Joker' : `${typeof this.value === 'string' ? this.value.charAt(0) : this.value} ${this.suit.charAt(0)}`
  },
  fullName: function () {
    return this.isJoker() ? 'Joker' : `${this.value} of ${this.suit}`
  },
  numericValue: function () {
    const faceValues = {
      'Jack': 11,
      'Queen': 12,
      'King': 13,
      'Ace': 14,
      'Joker': 15
    }

    return typeof this.value === 'string' ? faceValues[this.value] : this.value
  },
  isJoker: function () {
    return this.value === 'Joker'
  }
}

export default Card
