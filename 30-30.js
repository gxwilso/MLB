const fetch = require("node-fetch");

async function getPlayers() {
  const found = [];
  const response = await fetch(
    "https://statsapi.mlb.com/api/v1/stats?stats=Season&group=hitting&season=2024&limit=250&sortStat=atBats&hydrate&metrics&fields",
  );
  const data = await response.json();
  const players = data.stats[0].splits;
  for (i = 0; i < players.length - 1; i++) {
    player = players[i];
    if (player.stat.homeRuns >= 30 && player.stat.stolenBases >= 30) {
      found.push(player.player.fullName);
    }
  }

  return found;
}

getPlayers().then((players) => console.log(players));
