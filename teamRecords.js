const fetch = require('node-fetch');

// Array of active MLB team IDs
const teamIds = [108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142];

// API endpoint for game results
const endpoint = 'https://statsapi.mlb.com/api/v1/teams/history';

// Helper function to calculate won/lost record
function calculateRecord(games) {
  let wins = 0;
  let losses = 0;
  games.forEach(game => {
    if (game.isWinner) {
      wins++;
    } else {
      losses++;
    }
  });
  return `${wins}-${losses}`;
}

// Function to retrieve first 25 seasons' game results for each team
async function getRecords() {
  const records = {};
  for (let i = 0; i < teamIds.length; i++) {
    const teamId = teamIds[i];
    const response = await fetch(`${endpoint}?teamIds=${teamId}`);
    const data = await response.json();
    const name = data.teams[0].name;
    console.log(name);
    //const games = data.dates.flatMap(date => date.games).slice(0, 25 * 162);
    //const record = calculateRecord(games);
    //records[teamId] = record;
  }
  return records;
}

// Call getRecords function and log results
getRecords().then(records => {
  console.log(records);
});

