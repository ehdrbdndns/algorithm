function solution(n, m, list) {
  let result = [];
  let numberKeyList = new Map();
  let stringKeyList = new Map();
  for (let i = 0; i < n; i++) {
    numberKeyList.set(i + 1, list[i]);
    stringKeyList.set(list[i], i + 1);
  }

  const reg = /^[A-Za-z]+$/;
  for (let i = n; i < list.length; i++) {
    // console.log(list[i]);
    // console.log(numberKeyList[25]);

    if (reg.test([list[i]])) {
      // string
      result.push(stringKeyList.get(list[i]));
    } else {
      // number
      result.push(numberKeyList.get(Number(list[i])));
    }
  }
  console.log(result.join('\n'));
}

// let [option, ...list] = `26 5
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// Wartortle
// Blastoise
// Caterpie
// Metapod
// Butterfree
// Weedle
// Kakuna
// Beedrill
// Pidgey
// Pidgeotto
// Pidgeot
// Rattata
// Raticate
// Spearow
// Fearow
// Ekans
// Arbok
// Pikachu
// Raichu
// 25
// Raichu
// 3
// Pidgey
// Kakuna`.split('\n');

const fs = require('fs');
const [option, ...list] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [n, m] = option.split(' ');

solution(Number(n), Number(m), list);
