const LinkedList = require('./LinkedList')
class HashMapChained {
  constructor(initialCap=8) {
    this.length = 0;
    this._slotsUsed = 0;
    this._hashTable = [];
    this._slots = initialCap
    this._deleted = 0;
  }

  static _hashString(string) {
    //djb2
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);

      hash = hash & 0xffffffff; //keep lower 32 bits
    }
    return hash >>> 0;
  }

  get(key) {
    const node = this._findNode(key);
    return node.value.value;
  }

  /*
  _hashTable = [,,,,4 -> 9] //hash = val % length
  _resize(10) ==> _hashTable = [,,,,4,,,,,9]
  */

  _resize(size) {
    const oldSlots = this._hashTable;
    this._slots = size;
    this._slotsUsed = 0;
    this._deleted = 0;
    this.length = 0;
    this._hashTable = [];


    for (const slot of oldSlots) {
      if (slot !== undefined ) {
        let current = slot.head;
        while (current !== null) {
          if (!current.DELETED) {
            const {key, value} = current.value;
            this.set(key, value);
          }
          current = current.next;
        }
      }
    }
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._slots;
    if (loadRatio > HashMapChained.MAX_LOAD_RATIO) {
      this._resize(this._slots * HashMapChained.SIZE_RATIO);
    }
    try {
      contents = this._findNode(key);
      contents.value = value;
    }
    catch(e) {
      const index = this._findSlot(key);
      if (!this._hashTable[index]) {
        this._slotsUsed++;
        this._hashTable[index] = new LinkedList();
      }

      this._hashTable[index].insert({key, value});
      this.length++;
    }
  }
  delete(key) {
    const contents = this._findNode(key);
    contents.DELETED = true;
    this._slotsUsed--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMapChained._hashString(key);
    const start = hash % this._slots;
    return start;
  }

  _findNode(key) {
    const slot = this._findSlot(key);
    let node = this._hashTable[slot].find(key);
    if (node) return node;
    throw new Error('Key error')
  }
}

HashMapChained.MAX_LOAD_RATIO = 1;
HashMapChained.SIZE_RATIO = 3;

module.exports = HashMapChained;