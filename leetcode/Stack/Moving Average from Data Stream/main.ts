class CircleQueue {
  queue: number[];
  headInx: number;
  size: number;
  count: number;

  sum: number;

  constructor(size: number) {
    this.queue = new Array(size);
    this.size = size;
    this.headInx = 0;
    this.count = 0;
    this.sum = 0;
  }

  enQueue(value: number): boolean {
    // check full
    if (this.count === this.size) {
      this.deQueue();
    }

    this.queue[(this.headInx + this.count) % this.size] = value;
    this.count++;
    this.sum += value;

    return true;
  }

  deQueue(): boolean {
    if (this.count === 0) {
      return false;
    }

    this.sum -= this.queue[this.headInx];
    this.headInx = (this.headInx + 1) % this.size;
    this.count--;

    return true;
  }

  average(): number {
    if (this.count === 0) {
      return 0;
    }

    return this.sum / this.count;
  }
}

class MovingAverage {
  queue: CircleQueue

  constructor(size: number) {
    this.queue = new CircleQueue(size);
  }

  next(val: number): number {
    this.queue.enQueue(val);
    return this.queue.average();
  }
}

/**
* Your MovingAverage object will be instantiated and called as such:
* var obj = new MovingAverage(size)
* var param_1 = obj.next(val)
*/