const fetch = require("node-fetch");
const fs = require("fs");

// Note: Run this to append the latest season and then run "sort -t ',' -k 15,15 Batting.csv"
async function getPlayers() {
  const franchises = [108,109,110,111,112,113,114,115,116,117,118,119,120,121,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,158];
  const allPlayers = [];
  year = 2005;
  for (i = 0; i < 20; i++) {
    const api = `https://statsapi.mlb.com/api/v1/stats?stats=Season&group=pitching&season=${year}&limit=999&sortStat=inningsPitched&hydrate&metrics&fields`;
    const response = await fetch(api);
    const data = await response.json();
    const players = data.stats[0].splits;
    for (j = 0; j < players.length; j++) {
      const player = players[j];
      const teamId = parseInt(player.team.id);
      if (franchises.includes(teamId) && player.stat.gamesPitched > 0) {
        const stat = player.stat;
        const stats = `${player.player.fullName},${year},${player.team.name},${stat.inningsPitched},\
${stat.gamesPitched},${stat.gamesStarted},${stat.wins},${stat.losses},${stat.era},${stat.hits},\
${stat.baseOnBalls},${stat.strikeOuts},${stat.whip},${player.player.id}\n`
        allPlayers.push(stats);
      }
    }
    year++;
  }

  fs.appendFile('Pitching.csv', allPlayers.join(""), (err) => {
    if (err) throw err;
  })
}

getPlayers();
