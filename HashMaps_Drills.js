const HashMap = require('./HashMap')

const lotr = new HashMap()

let characters = {
   "Hobbit": "Bilbo" ,
   "Hobbit": "Frodo" ,
   "Wizard": "Gandolf" ,
   "Human": "Aragon" ,
   "Elf": "Legolas" ,
   "Maiar": "The Necromancer" ,
   "Maiar": "Sauron" ,
   "RingBearer": "Gollum" ,
   "LadyOfLight": "Galadriel" ,
   "HalfElven": "Arwen" ,
   "Ent": "Treebeard"
}


function main() {
  for (let character of Object.entries(characters) ) {
    lotr.set(character[0], character[1])
  }

  // console.log(lotr.get('Maiar'))
  console.log(lotr);
}

main();

/*
Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed all the items you were asked to?
Technically yes.....just because Bilbo and The Necromancer got overwritten doesn't mean we didn't hash them.

"The value of key 'Maiar' is 'Sauron' and the value of key 'Hobbit' is 'Frodo'. Since there can only be one key assigned to a value, the key values for Maiar and Hobbit were overwritten by the most recent values"

The capacity is 24.  We started with the default size of 8.  When we attempted to insert the fifth value, the HashMap noticed that that would take it over the max load ratio and resized itself by a factor of 3 (the size ratio)

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

pushing to github

*/