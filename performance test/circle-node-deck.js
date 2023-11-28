class Node {
  constructor(val, next, prev) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }

  getVal() {
    return this.val;
  }

  setVal(val) {
    this.val = val;
  }

  getNext() {
    return this.next;
  }

  setNext(node) {
    this.next = node;
  }

  getPrev() {
    return this.prev;
  }

  setPrev(node) {
    this.prev = node;
  }
}

class Deck {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  pushLeft(val) {
    // make new node and link head and tail
    const newNode = new Node(val, null, null);

    if (this.isEmpty()) {
      // no deck
      this.head = newNode;
      this.tail = newNode;
    } else {
      // one more
      // next: head, prev: tail
      newNode.setNext(this.head);
      newNode.setPrev(this.tail);
      this.head.setPrev(newNode);
      this.head = newNode;
      this.tail.setNext(this.head);
    }
    this.length++;
  }

  pushRight(val) {
    const newNode = new Node(val, null, null);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.setNext(this.head);
      newNode.setPrev(this.tail);
      this.tail.setNext(newNode);
      this.tail = newNode;
      this.head.setPrev(this.tail);
    }
    this.length++;
  }

  popLeft() {
    let pop = '';
    if (!this.isEmpty()) {
      pop = this.head.getVal();
      if (this.length > 1) {
        // tail.next = head.next; head.next.prev = tail; head = head.next;
        this.tail.setNext(this.head.getNext());
        this.head.getNext().setPrev(this.tail);
        this.head = this.head.getNext();
      } else {
        // this.length === 1
        this.head = null;
        this.tail = null;
      }
      this.length--;
    }
    return pop;
  }

  popRight() {
    let pop = '';
    if (!this.isEmpty()) {
      pop = this.tail.getVal();
      if (this.length > 1) {
        // tail.prev.next = head; head.prev = tail.prev; tail = tail.prev;
        this.tail.getPrev().setNext(this.head);
        this.head.setPrev(this.tail.getPrev());
        this.tail = this.tail.getPrev();
      } else {
        this.head = null;
        this.tail = null;
      }
      this.length--;
    }
    return pop;
  }

  isEmpty() {
    return this.head === null;
  }

  show() {
    const logs = [];
    let node = this.head;
    for (let i = 0; i < this.length; i++) {
      logs.push(node.val);
      node = node.getNext();
    }
    console.log(logs);
  }
}

function solution() {
  const deck = new Deck();
  deck.pushLeft(1);
  deck.pushLeft(2);
  deck.pushLeft(3);
  deck.pushRight(4);
  deck.show();
}

solution();
