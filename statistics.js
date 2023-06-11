const Deck = require("./deck.js");
const Dealer = require("./dealer.js");
const PokerHand = require("./hands.js")
class Statistics {
    constructor(numPlayers, numRounds) {
      this.numPlayers = numPlayers;
      this.numRounds = numRounds;
    }
  
    calculateHandProbabilities() {
      const handCounts = {
        "Royal Flush": 0,
        "Straight Flush": 0,
        "Five Picture": 0,
        "Four of a Kind": 0,
        "Full House": 0,
        "Flush": 0,
        "Straight": 0,
        "Fake Flush": 0,
        "Three of a Kind": 0,
        "Two Pairs": 0,
        "One Pair": 0,
        "High Card": 0
      };
  
      const totalPossibleHands = this.calculateTotalPossibleHands();
  
      for (let i = 0; i < this.numRounds; i++) {
        const myDeck = new Deck();
        myDeck.shuffle();
  
        const dealer = new Dealer(myDeck, this.numPlayers);
        dealer.dealInitialCards();
        dealer.dealRemainingCards();
  
        const pokerHands = dealer.players.map((playerCards) => new PokerHand(playerCards));
  
        for (let j = 0; j < this.numPlayers; j++) {
          const handRanking = pokerHands[j].handRanking;
          handCounts[handRanking]++;
        }
      }
  
      const handProbabilities = {};
      for (let hand in handCounts) {
        const probability = (handCounts[hand] / (this.numPlayers * this.numRounds)) * 100;
        handProbabilities[hand] = probability.toFixed(5);
      }
  
      return handProbabilities;
    }
  
    calculateTotalPossibleHands() {
      const numCardsInHand = 5;
      const numCardsInDeck = 52;
      let totalPossibleHands = 1;
  
      for (let i = 0; i < numCardsInHand; i++) {
        totalPossibleHands *= numCardsInDeck - i;
      }
  
      return totalPossibleHands;
    }
  }
  


  module.exports= Statistics;