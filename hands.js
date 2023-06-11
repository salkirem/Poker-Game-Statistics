const Deck = require("./deck.js");
const Dealer = require("./dealer.js");

class PokerHand {
    constructor(cards) {
      this.cards = cards;
      this.handRanking = this.getHandRanking();
    }
  
    getHandRanking() {
      if (this.isRoyalFlush()) {
        return "Royal Flush";
      } else if (this.isStraightFlush()) {
        return "Straight Flush";
      } else if (this.isFourOfAKind()) {
        return "Four of a Kind";
      } else if (this.isFullHouse()) {
        return "Full House";
      } else if (this.isFlush()) {
        return "Flush";
      } else if (this.isStraight()) {
        return "Straight";
      } else if (this.isThreeOfAKind()) {
        return "Three of a Kind";
      } else if (this.isTwoPairs()) {
        return "Two Pairs";
      } else if (this.isOnePair()) {
        return "One Pair";
      } else if (this.isFivePicture()) {
        return "Five Picture";
      } else if (this.isFakeFlush()) {
        return "Fake Flush";
      } else {
        return "High Card";
      }
    }
  
    // Helper methods for hand ranking checks
  
    isRoyalFlush() {
      const ranksInHand = this.cards.map((card) => card.rank);
      const suitsInHand = this.cards.map((card) => card.suit);
  
      const hasAce = ranksInHand.includes(14);
      const hasKing = ranksInHand.includes(13);
      const hasQueen = ranksInHand.includes(12);
      const hasJack = ranksInHand.includes(11);
      const hasTen = ranksInHand.includes(10);
  
      const isSameSuit = suitsInHand.every((suit) => suit === suitsInHand[0]);
  
      return hasAce && hasKing && hasQueen && hasJack && hasTen && isSameSuit;
    }
  
    isStraightFlush() {
      return this.isStraight() && this.isFlush();
    }
  
    isFourOfAKind() {
      const ranksInHand = this.cards.map((card) => card.rank);
  
      for (let rank of ranksInHand) {
        const count = ranksInHand.filter((r) => r === rank).length;
        if (count === 4) {
          return true;
        }
      }
  
      return false;
    }
  
    isFullHouse() {
      const ranksInHand = this.cards.map((card) => card.rank);
      const uniqueRanks = new Set(ranksInHand);
  
      if (uniqueRanks.size === 2) {
        for (let rank of uniqueRanks) {
          const count = ranksInHand.filter((r) => r === rank).length;
          if (count !== 2 && count !== 3) {
            return false;
          }
        }
        return true;
      }
  
      return false;
    }
  
    isFlush() {
      const suitsInHand = this.cards.map((card) => card.suit);
      return suitsInHand.every((suit) => suit === suitsInHand[0]);
    }
  
    isStraight() {
        const ranksInHand = this.cards.map((card) => card.rank);
        const uniqueRanks = [...new Set(ranksInHand)];
        const sortedRanks = uniqueRanks.sort((a, b) => a - b);
      
        if (sortedRanks.length !== 5) {
          return false;
        }
      
        if (sortedRanks[4] === 14 && sortedRanks[0] === 2) {
          // Check for wheel straight (A, 2, 3, 4, 5)
          return (
            sortedRanks[0] === 2 &&
            sortedRanks[1] === 3 &&
            sortedRanks[2] === 4 &&
            sortedRanks[3] === 5
          );
        }
      
        for (let i = 0; i < sortedRanks.length - 1; i++) {
          if (sortedRanks[i] + 1 !== sortedRanks[i + 1]) {
            return false;
          }
        }
      
        return true;
      }
      
  
    isThreeOfAKind() {
        if (this.isFivePicture()||this.isFakeFlush()) {
            return false;
          }
        const ranksInHand = this.cards.map((card) => card.rank);

        for (let rank of ranksInHand) {
        const count = ranksInHand.filter((r) => r === rank).length;
        if (count === 3) {
            return true;
        }
        }

        return false;
    }
  
    isTwoPairs() {
        if (this.isFivePicture()||this.isFakeFlush()) {
            return false;
          }
        const ranksInHand = this.cards.map((card) => card.rank);
        const uniqueRanks = new Set(ranksInHand);
    
        if (uniqueRanks.size === 3) {
            for (let rank of uniqueRanks) {
            const count = ranksInHand.filter((r) => r === rank).length;
            if (count !== 2 && count !== 1) {
                return false;
            }
            }
            return true;
        }
    
        return false;
    }
  
    isOnePair() {
        if (this.isFivePicture()||this.isFakeFlush()) {
            return false;
          }
        const ranksInHand = this.cards.map((card) => card.rank);
    
        for (let rank of ranksInHand) {
            const count = ranksInHand.filter((r) => r === rank).length;
            if (count === 2) {
            return true;
            }
        }
    
        return false;
    }
  
    isFivePicture() {
      const ranksInHand = this.cards.map((card) => card.rank);
      const pictureRanks = [11, 12, 13];
  
      return ranksInHand.every((rank) => pictureRanks.includes(rank));
    }
  
    isFakeFlush() {
      const suitsInHand = this.cards.map((card) => card.suit);
      const uniqueSuits = new Set(suitsInHand);
  
      if (uniqueSuits.size === 2) {
        const diamondsHeartsCombo = suitsInHand.every(
          (suit) => suit === 0 || suit === 1
        );
        const spadesClubsCombo = suitsInHand.every(
          (suit) => suit === 2 || suit === 3
        );
  
        return diamondsHeartsCombo || spadesClubsCombo;
      }
  
      return false;
    }
  }
  
  
module.exports = PokerHand;
//   // Create a deck and shuffle it
//   const myDeck = new Deck();
//   myDeck.shuffle();
  
//   // Define the number of players
//   const numPlayers = 4; // Example: 4 players
  
//   // Create a dealer with the shuffled deck and number of players
//   const dealer = new Dealer(myDeck, numPlayers);
  
//   // Deal initial cards to each player
//   dealer.dealInitialCards();
  
//   // Deal remaining cards to each player
//   dealer.dealRemainingCards();

// //   console.log(dealer.players)

//   const players = [
//     [
//       { suit: 3, rank: 12 },
//       { suit: 3, rank: 8 },
//       { suit: 1, rank: 5 },
//       { suit: 1, rank: 6 },
//       { suit: 2, rank: 5 }
//     ],
//     [
//       { suit: 1, rank: 14 },
//       { suit: 3, rank: 4 },
//       { suit: 0, rank: 10 },
//       { suit: 3, rank: 9 },
//       { suit: 1, rank: 9 }
//     ],
//     [
//       { suit: 0, rank: 14 },
//       { suit: 3, rank: 6 },
//       { suit: 2, rank: 7 },
//       { suit: 2, rank: 9 },
//       { suit: 0, rank: 13 }
//     ],
//     [
//       { suit: 0, rank: 13 },
//       { suit: 0, rank: 12 },
//       { suit: 1, rank: 11 },
//       { suit: 0, rank: 10 },
//       { suit: 1, rank:12 }
//     ]
//   ]
  
//   // Determine poker hands for each player
//   const pokerHands = dealer.players.map((playerCards) => new PokerHand(playerCards));
//   const pokerHandsTwo = players.map((playerCards) => new PokerHand(playerCards));

//   // Print the poker hands for each player
//   for (let i = 0; i < numPlayers; i++) {
//     console.log(`Player ${i+1} Hand: ${pokerHandsTwo[i].handRanking}`);
//   }
  