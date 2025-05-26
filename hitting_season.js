const fetch = require("node-fetch");
const fs = require("fs");

// Note: Run this to append the latest season and then run "sort -t ',' -k 15,15 Batting.csv"
async function getPlayers() {
  const franchises = [108,109,110,111,112,113,114,115,116,117,118,119,120,121,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,158];
  const allPlayers = [];
  year = 2005;
  for (i = 0; i < 20; i++) {
    const api = `https://statsapi.mlb.com/api/v1/stats?stats=Season&group=hitting&season=${year}&limit=999&sortStat=atBats&hydrate&metrics&fields`;
    const response = await fetch(api);
    const data = await response.json();
    const players = data.stats[0].splits;
    for (j = 0; j < players.length; j++) {
      const player = players[j];
      const teamId = parseInt(player.team.id);
      if (player.position.code !== '1' && franchises.includes(teamId)) {
        const stats = `${player.player.fullName}, ${year}, ${player.team.name}, ${player.stat.gamesPlayed}, \
${player.stat.plateAppearances}, ${player.stat.hits}, ${player.stat.doubles}, ${player.stat.triples}, \
${player.stat.homeRuns}, ${player.stat.stolenBases}, ${player.stat.avg}, ${player.stat.obp}, \
${player.stat.slg}, ${player.stat.ops}, ${player.player.id}\n`
        allPlayers.push(stats);
      }
    }
    year++;
  }

  fs.appendFile('Batting.csv', allPlayers.join(""), (err) => {
    if (err) throw err;
  })
}

getPlayers();
