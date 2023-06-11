const Deck = require("./deck.js")
class Dealer {
    constructor(deck, numPlayers) {
      this.deck = deck;
      this.numPlayers = numPlayers;
      this.players = Array.from({ length: numPlayers }, () => []);
    }
  
    dealInitialCards() {
      // Deal 3 cards to each player
      for (let i = 0; i < 3; i++) {
        for (let playerIndex = 0; playerIndex < this.numPlayers; playerIndex++) {
          const card = this.deck.drawCard();
          this.players[playerIndex].push(card);
        }
      }
    }
  
    dealRemainingCards() {
      // Deal 1 card at a time until each player has 5 cards
      for (let i = 0; i < 2; i++) {
        for (let playerIndex = 0; playerIndex < this.numPlayers; playerIndex++) {
          const card = this.deck.drawCard();
          this.players[playerIndex].push(card);
        }
      }
    }
  }
  

module.exports = Dealer;
//   Usage
//   const myDeck = new Deck();
//   myDeck.shuffle();
  
//   const dealer = new Dealer(myDeck, 2);
//   dealer.dealInitialCards();
//   dealer.dealRemainingCards();
  
//   console.log(dealer.players);
  