const csv = require('csv-parser');
const fs = require('fs');

let teams = [];
let players = [];
let draaTotal = 0;
let fraaTotal = 0;

fs.createReadStream('mlb-war-data-historical.csv')
  .pipe(csv())
  .on('data', (row) => {
    let raa = 0;
    if (!players[row.player_ID]) {
      players[row.player_ID] = {};
      players[row.player_ID].name = row.name_common;
      players[row.player_ID].batRAA = 0.0;
      players[row.player_ID].brRAA = 0.0;
      players[row.player_ID].fRAA = 0.0;
      players[row.player_ID].raa = 0.0;
    }
    if (row.year_ID > 1950) {
      if (row.BatRAA) {
        let batRAA = parseFloat(row.BatRAA);
        if (row.player_ID === 'bondsba01' && row.age >= 36) {
          batRAA = batRAA * 0.3; 
        }
        raa += batRAA;
        players[row.player_ID].batRAA += batRAA;
      }
      if (row.BRRAA) {
        const brRAA = parseFloat(row.BRRAA);
        raa += brRAA;
        players[row.player_ID].brRAA += brRAA;
      }
      if (row.FRAA) {
        const fRAA = parseFloat(row.FRAA);
        raa += fRAA;
        players[row.player_ID].fRAA += fRAA;
      }
      if (raa > 0) {
        players[row.player_ID].raa += raa;
      }
    }

    // if (!teams[row.team_ID]) {
    //   teams[row.team_ID] = {};
    //   teams[row.team_ID].draa = 0.0;
    //   teams[row.team_ID].fraa = 0.0;
    // }
    // if (row.FRAA) {
    //   const fraa = parseFloat(row.FRAA);
    //   teams[row.team_ID].fraa += fraa;
    //   fraaTotal += fraa;
    // }
  })
  .on('end', () => {
    const hofers = [];
    for (const playerId of Object.keys(players)) {
      const player = players[playerId];
      if (player.raa > 500) {
        player.batRAA = Math.round(player.batRAA);
        player.brRAA = Math.round(player.brRAA);
        player.fRAA = Math.round(player.fRAA);
        player.raa = Math.round(player.raa);
        hofers.push(player);
        // console.log(`${player.name}\t${Math.round(player.raa)}`);
      }
    }
    console.log(hofers.sort((a, b) => b.raa - a.raa));
  });
