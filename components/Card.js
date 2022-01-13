import Image from 'next/image'
import styles from './Card.module.scss'

const Card = ({ card, deck }) => (
  <div className={styles.card_container} key={`${card.value}_${card.suit}`}>
    <div className={styles.card}>
      <div className={styles.card_front}>
        <Image height={84} width={62} src={`/cards/${deck}/${card.value}_${card.suit}.png`} alt="" />
      </div>
      <div className={styles.card_back}>
        <Image height={84} width={62} src={`/cards/${deck}/card_back.png`} alt="card_back" />
      </div>
    </div>
  </div>
)

export default Card
