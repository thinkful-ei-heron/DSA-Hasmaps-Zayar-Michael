class HashMap {
  constructor(initialCap=8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCap
    this._deleted = 0;
  }

  static _hashString(string) {
    //djb2
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //x33 but may be more efficient
      //and shows why 33: shift bits 5 left then add original
      //so entangles bits with bits 5 to the left
      //5 and 32 are relatively prime (good for avalanching)
      //5 is also good for ASCII, where first four bits of each byte are fairly correlated
      //e.g. 0x0* and 0x1* are all control characters and unlikely to show up at all
      //0x2* is punctuation
      //0x3* is numbers (likely to show up in groups) and more punctuation
      //0x5* and 0x6* are all letters (and most of 0x4* and 0x7*)
      //0x8*-0xF* are extended and relatively rare
      //so a shift of 5 is good because it mixes the high-entropy low-order bits into the low-entropy high-order bits
      hash = (hash << 5) + hash + string.charCodeAt(i);

      hash = hash & 0xffffffff; //keep lower 32 bits
    }
    return hash >>> 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    return this._hashTable[index].value;
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false,
    };
  }

  delete(key) {
    const index = this._findSlot(key);
    const contents = this._hashTable([index]);
    if (contents === undefined) {
      throw new Error('Key error')
    }
    contents.DELETED = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity; //wrap around
      const contents = this._hashTable[index];
      if (contents === undefined || contents.key === key && !contents.DELETED) {
        return index;
      }
    }
    //we resize based on HashTable.MAX_LOAD_RATIO so should never have a full table
  }
}

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

module.exports = HashMap;