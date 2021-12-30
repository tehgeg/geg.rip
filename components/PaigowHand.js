import Card from './Card'
import styles from './PaigowHand.module.scss'

const PaigowHand = ({ hand, set = false }) => (
  (
    set ?
      (
        <div className={styles.hand}>
          <>
            {
              hand.low.map((card, i) => (
                <Card card={card} key={`$${card.value}_${card.suit}`} />
              ))
            }
            <div className={styles.spacer} />
            {
              hand.high.map((card, i) => (
                <Card card={card} key={`$${card.value}_${card.suit}`} />
              ))
            }
          </>
        </div>
      )
      :
      (
        <div className={styles.hand}>
          <>
            {
              hand.hand.map((card, i) => (
                <Card card={card} key={`${card.value}_${card.suit}`} />
              ))
            }
          </>
        </div>
      )
  )
)

export default PaigowHand
