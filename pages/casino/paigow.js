import Hand from '../../components/PaigowHand'
import Deck from '../../models/Deck'
import PaigowHand from '../../models/PaigowHand'
import styles from './paigow.module.scss'

const hands = []
for (let i = 0; i < 250; i++) {
  const deck = new Deck(1)
  deck.shuffle()
  const hand = new PaigowHand(deck.deal(7))
  hand.setHouseWay()
  hands.push(hand)
}

const Paigow = () => {
  return (
    <div className={styles.container}>
      {hands.map((hand, i) => (
        <div className={styles.hand_container} key={i}>
          <div className={styles.hand_index}>{i + 1}</div>
          <Hand hand={hand} />
          <div className={styles.arrow}>{'->'}</div>
          <Hand hand={hand} set />
        </div>
      ))}
    </div>
  )
}

export default Paigow
