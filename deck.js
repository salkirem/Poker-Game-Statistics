const suits = {
     "Hearts": 0,
     "Diamonds": 1 ,
     "Clubs": 2,
     "Spades": 3
  };
  
  const ranks = {
     "Ace": 14 ,
     "2": 2,
     "3": 3,
     "4": 4,
     "5": 5,
     "6": 6,
     "7": 7,
     "8": 8,
     "9": 9,
     "10": 10,
     "Jack": 11,
     "Queen": 12,
     "King" : 13
   };
  
class Deck {
    constructor() {
      this.cards = [];
  
      // Create the deck of cards
      for (let suit in suits) {
        for (let rank in ranks) {
          this.cards.push({ suit: suits[suit], rank: ranks[rank] });
        }
      }
    }
  
    shuffle() {
      // Fisher-Yates shuffle algorithm
      let currentIndex = this.cards.length;
  
      while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // Swap cards
        let temp = this.cards[currentIndex];
        this.cards[currentIndex] = this.cards[randomIndex];
        this.cards[randomIndex] = temp;
      }
    }
  
    drawCard() {
      // Remove and return the top card from the deck
      return this.cards.pop();
    }
  }

//   const myDeck = new Deck();
// myDeck.shuffle();
// // console.log(myDeck.drawCard());
// console.log(myDeck.cards); 

module.exports = Deck;


// 