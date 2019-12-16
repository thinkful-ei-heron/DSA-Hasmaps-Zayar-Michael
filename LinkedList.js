class LinkedList {
  constructor() {
    this.head = null;
  }
  insert(data) {
    //O(1)
    this.head = new _Node({...data}, this.head);
  }
  remove(key) {
    ///O(n)
    if (!this.head) {
      return;
    }
    if (this.head.value[key] !== undefined) {
      this.head = this.head.next;
      return;
    }
    let cur = this.head;
    let prev = this.head;
    while (cur !== null && cur.value !== data) {
      prev = cur;
      cur = cur.next;
    }
    if (cur === null) {
      return;
    }
    prev.next = cur.next;
  }
  find(key) {
    //O(n)
    let cur = this.head;
    while (cur !== null && cur.value.key !== key) {
      cur = cur.next;
    }
    return cur;
  }

  printList() {
    //prints each node in detail for debug
    let cur = this.head;
    while (cur !== null) {
      cur = cur.next;
    }
  }
}

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

module.exports = LinkedList;
