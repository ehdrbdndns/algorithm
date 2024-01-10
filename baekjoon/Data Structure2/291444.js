class PriorityQueue {
  constructor(init, iteratee) {
    this.queue = [init];
    this.iteratee = iteratee;
  }

  push(item) {
    this.queue.push(item);

    if (this.size() === 1) return;

    let curIndex = this.queue.length - 1;
    let rootIndex = Math.floor(curIndex / 2);

    while (this.iteratee(this.queue[curIndex], this.queue[rootIndex])) {
      [this.queue[curIndex], this.queue[rootIndex]] = [
        this.queue[rootIndex],
        this.queue[curIndex],
      ];
      curIndex = rootIndex;
      rootIndex = Math.floor(curIndex / 2);
    }
  }

  pop() {
    if (this.size() < 1) return null;
    if (this.size() === 1) return this.queue.pop();

    let result = this.queue[1];
    this.queue[1] = this.queue.pop();

    if (this.size() === 1) return result;

    let curIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;
    let childIndex = leftIndex;

    while (1) {
      if (this.queue[leftIndex] === undefined) {
        break;
      }

      if (
        this.queue[rightIndex] !== undefined &&
        this.iteratee(this.queue[rightIndex], this.queue[leftIndex])
      ) {
        childIndex = rightIndex;
      }

      if (this.iteratee(this.queue[childIndex], this.queue[curIndex])) {
        [this.queue[curIndex], this.queue[childIndex]] = [
          this.queue[childIndex],
          this.queue[curIndex],
        ];
        curIndex = childIndex;
        leftIndex = curIndex * 2;
        rightIndex = leftIndex + 1;
        childIndex = leftIndex;
      } else {
        break;
      }
    }

    return result;
  }

  size() {
    return this.queue.length - 1;
  }

  peek() {
    return this.queue[1];
  }
}

function maxHeapCondition(a, b) {
  if (a.l === b.l) {
    return a.p > b.p;
  } else {
    return a.l > b.l;
  }
}

function minHeapCondition(a, b) {
  if (a.l === b.l) {
    return a.p < b.p;
  } else {
    return a.l < b.l;
  }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
rl.question('', (answer) => {
  N = Number(answer);

  rl.on('line', solution).on('close', closeListener);
});

let orderCount = 0;
const heapMap = new Map();
const pMap = new Map();
const solvedMap = new Map();
const result = [];
heapMap.set('total', {
  min: new PriorityQueue(Number.MIN_SAFE_INTEGER, minHeapCondition),
  max: new PriorityQueue(Number.MAX_SAFE_INTEGER, maxHeapCondition),
});
function solution(line) {
  if (orderCount < N) {
    const [P, L, G] = line.split(' ').map((i) => Number(i));
    let min, max;
    if (heapMap.has(G)) {
      min = heapMap.get(G).min;
      max = heapMap.get(G).max;
    } else {
      min = new PriorityQueue(Number.MIN_SAFE_INTEGER, minHeapCondition);
      max = new PriorityQueue(Number.MAX_SAFE_INTEGER, maxHeapCondition);
    }

    min.push({ p: P, l: L });
    max.push({ p: P, l: L });

    heapMap.set(G, { min, max });
    pMap.set(P, L);

    const totalHeap = heapMap.get('total');
    totalHeap.max.push({ p: P, l: L });
    totalHeap.min.push({ p: P, l: L });
    orderCount++;
  } else if (orderCount > N) {
    let [order, ...list] = line.split(' ');
    let G,
      X,
      L,
      condition,
      item = '';
    switch (order) {
      case 'recommend':
        [G, X] = list.map((i) => Number(i));
        condition = X === 1 ? 'max' : 'min';
        while (1) {
          item = heapMap.get(G)[condition].peek();
          if (solvedMap.get(item.p) !== item.l) {
            break;
          } else {
            heapMap.get(G)[condition].pop();
          }
        }
        // solvedMap set
        result.push(item.p);
        break;
      case 'recommend2':
        X = Number(list[0]);
        G = 'total';
        condition = X === 1 ? 'max' : 'min';
        while (1) {
          item = heapMap.get(G)[condition].peek();
          if (solvedMap.get(item.p) !== item.l) {
            break;
          } else {
            heapMap.get(G)[condition].pop();
          }
        }
        result.push(item.p);
        break;
      case 'recommend3':
        let prevList = [];
        [X, L] = list.map((i) => Number(i));
        G = 'total';
        condition = X === 1 ? 'min' : 'max';
        let value = -1;
        item = heapMap.get(G)[condition].pop();
        while (true) {
          // console.log(item);
          if (solvedMap.get(item.p) !== item.l) {
            // console.log('1');
            if (condition === 'min') {
              if (item.l >= L) {
                // console.log('min');
                value = item.p;
                break;
              }
            } else {
              if (item.l <= L) {
                // console.log('max');
                value = item.p;
                break;
              }
            }
            prevList.push(item);
          }

          if (heapMap.get(G)[condition].size() === 0) {
            break;
          }

          item = heapMap.get(G)[condition].pop();
        }
        result.push(value);
        heapMap.get(G)[condition].push(item);
        prevList.forEach((v) => {
          heapMap.get(G)[condition].push({ p: v.p, l: v.l });
        });
        // console.log('heap');
        // console.log(heapMap.get(G)[condition]);
        break;
      case 'add':
        [P, L, G] = list.map((i) => Number(i));
        let min, max;
        if (heapMap.has(G)) {
          min = heapMap.get(G).min;
          max = heapMap.get(G).max;
        } else {
          min = new PriorityQueue(Number.MIN_SAFE_INTEGER, minHeapCondition);
          max = new PriorityQueue(Number.MAX_SAFE_INTEGER, maxHeapCondition);
        }

        min.push({ p: P, l: L });
        max.push({ p: P, l: L });

        heapMap.set(G, { min, max });
        pMap.set(P, L);

        const totalHeap = heapMap.get('total');
        totalHeap.max.push({ p: P, l: L });
        totalHeap.min.push({ p: P, l: L });
        break;
      case 'solved':
        P = Number(list[0]);
        L = pMap.get(P);
        solvedMap.set(P, L);
        break;
      default:
        break;
    }
  } else {
    orderCount++;
  }
}

function closeListener() {
  console.log(result.join('\n'));
  process.exit();
}
