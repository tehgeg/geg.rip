import Card from './Card'
import styles from './PaigowHand.module.scss'

const PaigowHand = ({ hand, deck, set = false }) => (
  (
    set ?
      (
        <>
          <div className={styles.handFull}>
            {hand.lowRank}
            <div className={styles.handCards}>
              {
                hand.low.map((card, i) => (
                  <Card card={card} deck={deck} key={`$${card.value}_${card.suit}`} />
                ))
              }
            </div>
          </div>
          <div className={styles.spacer} />
          <div className={styles.handFull}>
            {hand.highRank}
            <div className={styles.handCards}>
              {
                hand.high.map((card, i) => (
                  <Card card={card} deck={deck} key={`$${card.value}_${card.suit}`} />
                ))
              }
            </div>
          </div>
        </>
      )
      :
      (
        <div className={styles.hand}>
          {
            hand.hand.map((card, i) => (
              <Card card={card} deck={deck} key={`${card.value}_${card.suit}`} />
            ))
          }
        </div>
      )
  )
)

export default PaigowHand
