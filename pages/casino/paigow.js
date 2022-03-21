import Card from '../../models/Card'
import Hand from '../../components/PaigowHand'
import Deck from '../../models/Deck'
import PaigowHand from '../../models/PaigowHand'
import styles from './paigow.module.scss'
import { useState, useRef } from 'react'

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
