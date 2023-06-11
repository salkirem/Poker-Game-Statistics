const Statistics = require("./statistics.js")
const numPlayers = 1;
const numRounds = 1000000;
if (require.main === module) {


  const statistics = new Statistics(numPlayers, numRounds);
  const handProbabilities = statistics.calculateHandProbabilities();

  // Print the probabilities of each hand occurring
  for (let hand in handProbabilities) {
    console.log(`${hand}: ${parseFloat(handProbabilities[hand]).toFixed(5)}%`);
  }
}