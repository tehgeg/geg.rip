import Card from '../../models/Card'
import Hand from '../../components/PaigowHand'
import Deck from '../../models/Deck'
import PaigowHand from '../../models/PaigowHand'
import styles from './paigow.module.scss'
import { useState, useRef } from 'react'

const dealerDeck = new Deck(1)
dealerDeck.shuffle()
const dealerHand = new PaigowHand(dealerDeck.deal(7))
dealerHand.setHouseWay()

const faceUpHands = []
for (let i = 0; i < 5; i++) {
  const deck = new Deck(1)
  deck.shuffle()
  const hand = new PaigowHand(deck.deal(7))
  hand.setFaceUp(dealerHand)
  faceUpHands.push(hand)
}

const hands = []
for (let i = 0; i < 10; i++) {
  const deck = new Deck(1)
  deck.shuffle()
  const hand = new PaigowHand(deck.deal(7))
  hand.setHouseWay()
  hands.push(hand)
}
const test = new PaigowHand([new Card('', 'Joker'), new Card('Spades', 'Ace'), new Card('Hearts', 'Ace'), new Card('Spades', 'King'), new Card('Hearts', 'Queen'), new Card('Diamonds', 10), new Card('Clubs', 5)])
test.setHouseWay()
hands.push(test)
const test2 = new PaigowHand([new Card('', 'Joker'), new Card('Spades', 'Ace'), new Card('Hearts', 'Ace'), new Card('Spades', 'King'), new Card('Hearts', 'Queen'), new Card('Hearts', 10), new Card('Hearts', 5)])
test2.setHouseWay()
hands.push(test2)
const test3 = new PaigowHand([new Card('', 'Joker'), new Card('Spades', 'Ace'), new Card('Hearts', 'Ace'), new Card('Hearts', 'King'), new Card('Hearts', 'Queen'), new Card('Hearts', 10), new Card('Clubs', 5)])
test3.setHouseWay()
hands.push(test3)
const test4 = new PaigowHand([new Card('Clubs', 'King'), new Card('Diamonds', 8), new Card('Hearts', 7), new Card('Spades', 7), new Card('Clubs', 7), new Card('Diamonds', 7), new Card('Hearts', 2)])
test4.setHouseWay()
hands.push(test4)
const test5 = new PaigowHand([new Card('', 'Joker'), new Card('Hearts', 'Ace'), new Card('Clubs', 'Ace'), new Card('Spades', 'Ace'), new Card('Diamonds', 'Ace'), new Card('Spades', 'King'), new Card('Clubs', 'King')])
test5.setHouseWay()
hands.push(test5)
const test6 = new PaigowHand([new Card('', 'Joker'), new Card('Hearts', 'Ace'), new Card('Clubs', 'Ace'), new Card('Spades', 'Ace'), new Card('Diamonds', 'Ace'), new Card('Spades', 8), new Card('Clubs', 8)])
test6.setHouseWay()
hands.push(test6)
const test7 = new PaigowHand([new Card('', 'Joker'), new Card('Hearts', 'Ace'), new Card('Clubs', 'Ace'), new Card('Spades', 'Ace'), new Card('Diamonds', 'Ace'), new Card('Spades', 'King'), new Card('Clubs', 'Jack')])
test7.setHouseWay()
hands.push(test7)
const test8 = new PaigowHand([new Card('', 'Joker'), new Card('Clubs', 4), new Card('Spades', 3), new Card('Hearts', 'King'), new Card('Diamonds', 'Queen'), new Card('Clubs', 'Jack'), new Card('Hearts', 10)])
test8.setHouseWay()
hands.push(test8)
const test9 = new PaigowHand([new Card('', 'Joker'), new Card('Clubs', 5), new Card('Diamonds', 'King'), new Card('Spades', 5), new Card('Clubs', 4), new Card('Hearts', 3), new Card('Spades', 2)])
test9.setHouseWay()
hands.push(test9)
const test10 = new PaigowHand([new Card('', 'Joker'), new Card('Clubs', 'Ace'), new Card('Hearts', 'Ace'), new Card('Spades', 'King'), new Card('Diamonds', 'Queen'), new Card('Clubs', 'Jack'), new Card('Spades', 10)])
test10.setHouseWay()
hands.push(test10)
const test11 = new PaigowHand([new Card('', 'Joker'), new Card('Clubs', 'Ace'), new Card('Hearts', 'Ace'), new Card('Spades', 'King'), new Card('Diamonds', 'Queen'), new Card('Hearts', 9), new Card('Spades', 10)])
test11.setHouseWay()
hands.push(test11)
const test12 = new PaigowHand([new Card('Hearts', 10), new Card('Diamonds', 9), new Card('Hearts', 8), new Card('Spades', 7), new Card('Diamonds', 6), new Card('Hearts', 5), new Card('', 'Joker')])
test12.setHouseWay()
hands.push(test12)
const test13 = new PaigowHand([new Card('Spades', 'Ace'), new Card('', 'Joker'), new Card('Hearts', 'King'), new Card('Clubs', 'Queen'), new Card('Diamonds', 'Jack'), new Card('Spades', 10), new Card('Clubs', 10)])
test13.setHouseWay()
hands.push(test13)
const test14 = new PaigowHand([new Card('Spades', 'Ace'), new Card('', 'Joker'), new Card('Hearts', 'King'), new Card('Clubs', 'Queen'), new Card('Diamonds', 'Jack'), new Card('Spades', 10), new Card('Clubs', 9)])
test14.setHouseWay()
hands.push(test14)
const test15 = new PaigowHand([new Card('', 'Joker'), new Card('Hearts', 6), new Card('Diamonds', 5), new Card('Clubs', 4), new Card('Spades', 3), new Card('Hearts', 2), new Card('Spades', 'Ace')])
test15.setHouseWay()
hands.push(test15)
const test16 = new PaigowHand([new Card('', 'Joker'), new Card('Clubs', 7), new Card('Hearts', 6), new Card('Spades', 5), new Card('Spades', 4), new Card('Clubs', 3), new Card('Diamonds', 2)])
test16.setHouseWay()
hands.push(test16)

const Paigow = () => {
  const felt = useRef('#9651A4')
  const [feltColor, setFeltColor] = useState('#9651A4')
  const [deckTheme, setDeckTheme] = useState('alt')

  return (
    <div className={styles.container} style={{ backgroundColor: feltColor }}>
      <div className={styles.selectors}>
        <div className={styles.deck_selector}>
          <label>Deck Theme</label>
          <select value={deckTheme} onChange={(e) => setDeckTheme(e.target.value)}>
            <option value="classic">Classic 4-Color</option>
            <option value="alt">Pixel Art</option>
          </select>
        </div>
        <div className={styles.felt_selector}>
          <label>Felt Color</label>
          <input type="color" value={felt.current} onChange={(e) => felt.current = e.target.value} />
          <button type="button" onClick={() => setFeltColor(felt.current)}>Set Felt</button>
        </div>
      </div>
      <h2>Dealer Hand</h2>
      <div className={styles.hand_container}>
          <Hand hand={dealerHand} deck={deckTheme} />
          <div className={styles.arrow}>{'->'}</div>
          <Hand hand={dealerHand} deck={deckTheme} set />
        </div>
      {faceUpHands.map((hand, i) => (
        <div className={styles.hand_container} key={i}>
          <div className={styles.hand_index}>{i + 1}</div>
          <Hand hand={hand} deck={deckTheme} />
          <div className={styles.arrow}>{'->'}</div>
          <Hand hand={hand} deck={deckTheme} set />
        </div>
      ))}
      --------------------------------------------------------------------------
      {hands.map((hand, i) => (
        <div className={styles.hand_container} key={i}>
          <div className={styles.hand_index}>{i + 1}</div>
          <Hand hand={hand} deck={deckTheme} />
          <div className={styles.arrow}>{'->'}</div>
          <Hand hand={hand} deck={deckTheme} set />
        </div>
      ))}
    </div>
  )
}

export default Paigow
