class MyCircularQueue {
  private queue: number[];
  private front: number;
  private back: number;

  private total_size: number;
  public current_size: number;

  constructor(k: number) {
    this.queue = new Array(k);
    this.front = -1;
    this.back = -1;

    this.total_size = k;
    this.current_size = 0;
  }

  enQueue(value: number): boolean {
    if (this.isFull()) {
      return false;
    }

    if (this.front === -1) {
      this.front = 0;
    }

    this.current_size++;
    this.back = (this.back + 1) % this.total_size;

    this.queue[this.back] = value;

    return true;
  }

  deQueue(): boolean {
    if (this.isEmpty()) {
      return false;
    }

    this.current_size--;
    this.front = (this.front + 1) % this.total_size;

    return true;
  }

  Front(): number {
    if (this.isEmpty()) {
      return -1
    };
    return this.queue[this.front];
  }

  Rear(): number {
    if (this.isEmpty()) {
      return -1
    };
    return this.queue[this.back];
  }

  isEmpty(): boolean {
    return this.current_size === 0;
  }

  isFull(): boolean {
    return this.current_size === this.total_size;
  }
}

/**
* Your MyCircularQueue object will be instantiated and called as such:
* var obj = new MyCircularQueue(k)
* var param_1 = obj.enQueue(value)
* var param_2 = obj.deQueue()
* var param_3 = obj.Front()
* var param_4 = obj.Rear()
* var param_5 = obj.isEmpty()
* var param_6 = obj.isFull()
*/