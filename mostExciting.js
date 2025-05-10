const csv = require('csv-parser');
const fs = require('fs');
// const inspector = require('inspector');

let teams = [];
let players = [];
let draaTotal = 0;
let fraaTotal = 0;

// inspector.waitForDebugger();

fs.createReadStream('/Users/gregwilson/workspace/MLB/baseballdatabank-2023/core/Batting.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.yearID > 1945) {
        var avg = row.H/row.AB;
        avg = avg.toFixed(3);
        var sb = Number(row.SB);
        var hr = Number(row.HR);
        var psn = (2 * hr * sb)/(hr + sb);
        if ((avg >= .350 && row.AB > 500) || 
            (hr >= 50) ||
            (avg >= .280 && 
              ((sb >= 15 && hr >= 30) || (sb >= 30 && hr >= 15) || (sb >= 50)))) {
        // if (row.playerID === 'suzukic01') {
            console.log("%s\t%s\t%f\t%i\t%i\t%i\t%f", row.playerID, row.yearID, avg, hr, sb, psn, (avg*psn).toFixed(1));
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
//   .on('end', () => {
//     const hofers = [];
//     let rank = 1;
//     for (const playerId of Object.keys(players)) {
//       const player = players[playerId];
//       if (player.raa > 500) {
//         player.batRAA = Math.round(player.batRAA);
//         player.brRAA = Math.round(player.brRAA);
//         player.fRAA = Math.round(player.fRAA);
//         player.raa = Math.round(player.raa);
//         hofers.push(player);
//         // console.log(`${player.name}\t${Math.round(player.raa)}`);
//       }
//     }
//     // console.log(hofers.length);
//     console.log(hofers.sort((a, b) => b.raa - a.raa));
//  });
