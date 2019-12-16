const HashMap = require('./HashMap')
const HashMapChained = require('./HashMap_chained')

const lotr = new HashMap()
const lotr2 = new HashMapChained();
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
     lotr2.set(character[0], character[1])
  }
  lotr.set('hobbit', 'Bilbo')
  // console.log(lotr2);
    console.log(lotr2.get('Maiar'))




  // console.log(removeDuplicates('google'))
  // console.log(removeDuplicates('google all that you think can think of'))
  // console.log(hasPalindromicPermutation('acecarr'));
  // console.log(hasPalindromicPermutation('north'))
  // console.log(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))
}

main();

function removeDuplicates(str) {
  let chars = new HashMap();
  let result = '';
  for (let char of str) {
    try {
      chars.get(char);
    }
    catch (e) {
      result += char;
    }
    chars.set(char, char);
  }
  return result;
}

function hasPalindromicPermutation(str) {
  const chars = new HashMap();
  for (let char of str) {
    let count;
    try {
      count = chars.get(char);
    }
    catch (e) {
      count = 0;
    }
    count++;
    chars.set(char, count);
  }
  let odds = 0;
  for (let count of chars._hashTable) { //don't think I like this

    if (count.value % 2) { //character shows up an odd number of times
      odds++;
    }
  }
  //if every character except at most one shows up an even number of times, at least one permutation is a palindrome
  return odds < 2;
}

function groupAnagrams(arr) {
  let map = new HashMap()
  for (let idx in arr) {
    let sorted = arr[idx].split('').sort().join('');
    let anagrams;
    try{
      anagrams = map.get(sorted)
    } catch(e) {
      anagrams = []
    }
    anagrams.push(arr[idx])
    map.set(sorted, anagrams)
  }
  console.log(map._hashTable)
  let results = [];
  for (let entry of map._hashTable) { //still don't like this
      results.push(entry.value);
  }
  return results;
}


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
str1 = str2 = str3 = str4 = 'Hello World.'
map1['Hello World.'] = 10
map1['Hello World.'] = 20
map2['Hello World.'] = 20
map2['Hello World.'] = 10

final results: map1 is hashmap with 1 key ('Hello World.') and value of that key is 20, map2 is same but value is 10
so output will be:
20
10


3. Demonstrate understanding of Hash maps
*You don't need to write code for the following two drills. use any drawing app or simple pen and paper *

1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using open addressing and a hash function k mod m, where k is the key and m is the length.
are we assuming resizing or no?
with resizing, length will be bumped by size ratio (assuming default 3) up to 33
hash table looks like [,,,,4,,,,,,10,,,,,15,,17,,,,,22,88,,,59,,28,,,31,]
without resizing:
[22,88,,,4,15,28,17,59,31,10]

2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m.
with resizing, length will be bumped by size ratio (assuming default 3) up to 27
[,28,,,,5,33,,,,10,,12,,,15,,17,,19,20,,,,,,]
without resizing:
[,28->19->10,20,12,,5,15->33,,17]


*/