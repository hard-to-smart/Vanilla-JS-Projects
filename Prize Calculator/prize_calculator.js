const awards = require("./awards.js");

function calculatePrizes(awards) {
  const prize_money = 1.0;
  const prize = new Map();

  awards.forEach((award) => {
    const { name, category, team, year } = award;
    const key = `${category}-${year}`;

    if (!prize.has(key)) {
      prize.set(key, new Map());
    }

    const team_prize = prize.get(key);
    if (!team_prize.has(team)) {
      team_prize.set(team, []);
    }

    const winners = team_prize.get(team);
    winners.push(name);
  });

  const result = [];

  prize.forEach((teams, key) => {
    const [category, year] = key.split("-");
    const winnerArray = [];

    teams.forEach((winners) => {
      winners.forEach((winner) => 
       winnerArray.push({
          name: winner,
          share: Number((prize_money / winners.length).toFixed(2)),
        })
      );
        
      });
      result.push({
        category,
        year: Number(year),
        // winners: winnerArray.map((winner) => {
        //     return { name: winner.name, share: winner.share }; 
        //   })
        winners: winnerArray
      });
    });

    return result;

  };



const result= calculatePrizes(awards);
console.log(JSON.stringify(result))
