/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxKelements = function(nums, k) {
    const maxPriorityQueue = new MaxPriorityQueue();
    
    for(let i = 0; i < nums.length; i++) {
        maxPriorityQueue.enqueue(nums[i]);
    }

    let score = 0;
    for(let i = 0; i < k; i++) {
        let {element: num} = maxPriorityQueue.dequeue();
        score += num;
        maxPriorityQueue.enqueue(Math.ceil(num / 3))
    }

    return score;
};