import Image from 'next/image'
import Card from '../../models/Card'
import Deck from '../../models/Deck'
import PaigowHand from '../../models/PaigowHand'

let deck = new Deck(1)
deck.shuffle()
let dealerHand = new PaigowHand(deck.deal(7))
let player1Hand = new PaigowHand(deck.deal(7))
let player2Hand = new PaigowHand(deck.deal(7))
let player3Hand = new PaigowHand(deck.deal(7))
let player4Hand = new PaigowHand(deck.deal(7))
let player5Hand = new PaigowHand(deck.deal(7))
let player6Hand = new PaigowHand(deck.deal(7))
let dummyHand = new PaigowHand([new Card('Spades', 'Ace'), new Card('Diamonds', 7), new Card('Diamonds', 6), new Card('Hearts', 5), new Card('Hearts', 4), new Card('Spades', 3), new Card('Hearts', 2)])
let dummyHand2 = new PaigowHand([new Card('', 'Joker'), new Card('Diamonds', 'Queen'), new Card('Diamonds', 9), new Card('Hearts', 8), new Card('Hearts', 7), new Card('Spades', 6), new Card('Clubs', 5)])
let dummyHand3 = new PaigowHand([new Card('', 'Joker'), new Card('Diamonds', 9), new Card('Diamonds', 8), new Card('Hearts', 7), new Card('Clubs', 6), new Card('Spades', 6), new Card('Hearts', 5)])
let dummyHand4 = new PaigowHand([new Card('Clubs', 10), new Card('Diamonds', 9), new Card('Diamonds', 8), new Card('Hearts', 7), new Card('Clubs', 7), new Card('Spades', 6), new Card('Hearts', 5)])
let dummyHand5 = new PaigowHand([new Card('Spades', 'Ace'), new Card('Diamonds', 'Ace'), new Card('Clubs', 'Ace'), new Card('Hearts', 5), new Card('Clubs', 4), new Card('Spades', 3), new Card('Hearts', 2)])
let dummyHand6 = new PaigowHand([new Card('', 'Joker'), new Card('Diamonds', 'Ace'), new Card('Clubs', 'Ace'), new Card('Hearts', 5), new Card('Clubs', 4), new Card('Spades', 3), new Card('Hearts', 2)])
let dummyHand7 = new PaigowHand([new Card('', 'Joker'), new Card('Diamonds', 'Ace'), new Card('Clubs', 'Ace'), new Card('Hearts', 'King'), new Card('Clubs', 'Jack'), new Card('Spades', 10), new Card('Hearts', 10)])
let dummyHand8 = new PaigowHand([new Card('Diamonds', 'Queen'), new Card('Diamonds', 'Ace'), new Card('Clubs', 'Ace'), new Card('Hearts', 'King'), new Card('Clubs', 'Jack'), new Card('Spades', 10), new Card('Hearts', 10)])
let dummyHand9 = new PaigowHand([new Card('Diamonds', 7), new Card('Diamonds', 6), new Card('Diamonds', 5), new Card('Diamonds', 4), new Card('Diamonds', 3), new Card('Diamonds', 2), new Card('Diamonds', 'Ace')])

dealerHand.sortHand()
player1Hand.sortHand()
player2Hand.sortHand()
player3Hand.sortHand()
player4Hand.sortHand()
player5Hand.sortHand()
player6Hand.sortHand()
dummyHand.sortHand()
dummyHand2.sortHand()
dummyHand3.sortHand()
dummyHand4.sortHand()
dummyHand5.sortHand()
dummyHand6.sortHand()
dummyHand7.sortHand()
dummyHand8.sortHand()
dummyHand9.sortHand()
const dealerResult = dealerHand.identifyHand()
const player1Result = player1Hand.identifyHand()
const player2Result = player2Hand.identifyHand()
const player3Result = player3Hand.identifyHand()
const player4Result = player4Hand.identifyHand()
const player5Result = player5Hand.identifyHand()
const player6Result = player6Hand.identifyHand()
const dummyResult = dummyHand.identifyHand()
const dummyResult2 = dummyHand2.identifyHand()
const dummyResult3 = dummyHand3.identifyHand()
const dummyResult4 = dummyHand4.identifyHand()
const dummyResult5 = dummyHand5.identifyHand()
const dummyResult6 = dummyHand6.identifyHand()
const dummyResult7 = dummyHand7.identifyHand()
const dummyResult8 = dummyHand8.identifyHand()
const dummyResult9 = dummyHand9.identifyHand()
console.log('dealer', dealerResult)
console.log('1', player1Result)
console.log('2', player2Result)
console.log('3', player3Result)
console.log('4', player4Result)
console.log('5', player5Result)
console.log('6', player6Result)
console.log('d1', dummyResult)
console.log('d2', dummyResult2)
console.log('d3', dummyResult3)
console.log('d4', dummyResult4)
console.log('d5', dummyResult5)
console.log('d6', dummyResult6)
console.log('d7', dummyResult7)
console.log('d8', dummyResult8)
console.log('d9', dummyResult9)

const Paigow = () => {
  return (
    <div>
      <div>
        Dealer
        {
          dealerHand.hand.map(card => (
            <Image key={`${card.value}_${card.suit}`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Player 1
        {
          player1Hand.hand.map(card => (
            <Image key={`${card.value}_${card.suit}`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Player 2
        {
          player2Hand.hand.map(card => (
            <Image key={`${card.value}_${card.suit}`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Player 3
        {
          player3Hand.hand.map(card => (
            <Image key={`${card.value}_${card.suit}`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Player 4
        {
          player4Hand.hand.map(card => (
            <Image key={`${card.value}_${card.suit}`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Player 5
        {
          player5Hand.hand.map(card => (
            <Image key={`${card.value}_${card.suit}`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Player 6
        {
          player6Hand.hand.map(card => (
            <Image key={`${card.value}_${card.suit}`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Dummy Hand
        {
          dummyHand.hand.map(card => (
            <Image key={`${card.value}_${card.suit}d`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Dummy Hand 2
        {
          dummyHand2.hand.map(card => (
            <Image key={`${card.value}_${card.suit}d`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Dummy Hand 3
        {
          dummyHand3.hand.map(card => (
            <Image key={`${card.value}_${card.suit}d`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Dummy Hand 4
        {
          dummyHand4.hand.map(card => (
            <Image key={`${card.value}_${card.suit}d`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Dummy Hand 5
        {
          dummyHand5.hand.map(card => (
            <Image key={`${card.value}_${card.suit}d`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Dummy Hand 6
        {
          dummyHand6.hand.map(card => (
            <Image key={`${card.value}_${card.suit}d`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Dummy Hand 7
        {
          dummyHand7.hand.map(card => (
            <Image key={`${card.value}_${card.suit}d`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Dummy Hand 8
        {
          dummyHand8.hand.map(card => (
            <Image key={`${card.value}_${card.suit}d`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
      <div>
        Dummy Hand 9
        {
          dummyHand9.hand.map(card => (
            <Image key={`${card.value}_${card.suit}d`} height={84} width={62} src={`/cards/${card.value}_${card.suit}.png`} alt="" />
          ))
        }
      </div>
    </div>
  )
}

export default Paigow
