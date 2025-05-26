const fetch = require("node-fetch");

async function getTeams() {
  const majorLeagueTeamIDs = [];
  const response = await fetch(
    "https://statsapi.mlb.com/api/v1/teams",
  );
  const data = await response.json();
  const teams = data.teams;
  for (i = 0; i < teams.length; i++) {
    team = teams[i];
    if (team.league.id == '103' || team.league.id == '104') {
      majorLeagueTeamIDs.push(team.id);
    }
  }

  console.log(majorLeagueTeamIDs.toString())
}

getTeams();
