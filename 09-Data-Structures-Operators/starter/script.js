// 'use strict';
//
// // // Data needed for a later exercise
// // const flights =
// //   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
// //
// // // Data needed for first part of the section
// // const restaurant = {
// //   name: 'Classico Italiano',
// //   location: 'Via Angelo Tavanti 23, Firenze, Italy',
// //   categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
// //   starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
// //   mainMenu: ['Pizza', 'Pasta', 'Risotto'],
// //
// //   openingHours: {
// //     thu: {
// //       open: 12,
// //       close: 22
// //     },
// //     fri: {
// //       open: 11,
// //       close: 23
// //     },
// //     sat: {
// //       open: 0, // Open 24 hours
// //       close: 24
// //     }
// //   }
// // };
//
// // const game = {
// //   team1: 'Bayern Munich',
// //   team2: 'Borrussia Dortmund',
// //   players: [
// //     [
// //       'Neuer',
// //       'Pavard',
// //       'Martinez',
// //       'Alaba',
// //       'Davies',
// //       'Kimmich',
// //       'Goretzka',
// //       'Coman',
// //       'Muller',
// //       'Gnarby',
// //       'Lewandowski'
// //     ],
// //     [
// //       'Burki',
// //       'Schulz',
// //       'Hummels',
// //       'Akanji',
// //       'Hakimi',
// //       'Weigl',
// //       'Witsel',
// //       'Hazard',
// //       'Brandt',
// //       'Sancho',
// //       'Gotze'
// //     ]
// //   ],
// //   score: '4:0',
// //   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
// //   date: 'Nov 9th, 2037',
// //   odds: {
// //     team1: 1.33,
// //     x: 3.25,
// //     team2: 6.5
// //   }
// // };
// //
// // const [player1, player2] = game.players;
// // const [gk, ...fieldPlayers] = player1;
// // const players = [...player1, ...player2];
// // const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
// // const { team1, x: draw, team2 } = game.odds;
// // const printGoals = function(...players) {
// //   let goals = {};
// //   for (let name of players) {
// //     goals[name] ??= 0;
// //     goals[name] += 1;
// //   }
// //   console.log(goals);
// // };
// // printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels')
//
// // Coding Challenge #2
//
// /*
// Let's continue with our football betting app!
//
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
//
// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }
//
// GOOD LUCK 😀
// */
//
// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski'
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze'
//     ]
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5
//   }
// };
//
// for (const [i, player] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${player}`);
// }
//
// const calculateAvgOdds = function() {
//   let sum = 0;
//   for (const v of Object.values(game.odds)) {
//     sum += v;
//   }
//   console.log(`Average odds: ${sum / Object.keys(game.odds).length}`);
// };
// calculateAvgOdds();
//
// for (const [team, odd] of Object.entries(game.odds)) {
//   const str = `Odd of victory ${game[team] || 'draw'}: ${odd}`;
//   console.log(str);
// }
//
// let scorers = {};
// for (const player of game.scored) {
//   scorers[player] = (scorers[player] || 0) + 1;
// }
// console.log(scorers);
//
//
// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);
//
// const events = new Set(gameEvents.values());
// console.log(events);
//
// console.log(gameEvents.delete(64));
//
// for (const [key, value] of gameEvents.entries()) {
//   console.log(`[${key >=45 ? 'SECOND HALF' : 'FIRST HALF'}] ${key}: ${value}`);
// }

const underscoresToCamelCase = function(str) {
  const parts = str.toLowerCase().split('_');
  const allUppercase = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  return allUppercase[0].toLowerCase() + allUppercase.slice(1);
};
console.log(underscoresToCamelCase('underscore_case') === 'underscoreCase');
console.log(underscoresToCamelCase('first_name') === 'firstName');
console.log(underscoresToCamelCase('Some_Variable') === 'someVariable');
console.log(underscoresToCamelCase('calculate_AGE') === 'calculateAge');
console.log(underscoresToCamelCase('delayed_departure') === 'delayedDeparture');
console.log(underscoresToCamelCase('underscore_case'));
console.log(underscoresToCamelCase('first_name'));
console.log(underscoresToCamelCase('Some_Variable'));
console.log(underscoresToCamelCase('calculate_AGE'));
console.log(underscoresToCamelCase('delayed_departure'));