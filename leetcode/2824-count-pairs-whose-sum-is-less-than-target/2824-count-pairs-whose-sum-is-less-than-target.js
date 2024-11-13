var countPairs = function(nums, target) {
    const sortedNums = nums.sort((a, b) => a - b);
    let count = 0;
    
    for (let i = 0; i < sortedNums.length; i++) {
        const elem = target - sortedNums[i];
        
        let low = i + 1;
        let high = sortedNums.length;
        
        // Binary search to find the first element that is >= elem
        while (low < high) {
            const middle = low + Math.floor((high - low) / 2);
            
            if (sortedNums[middle] < elem) {
                low = middle + 1;
            } else {
                high = middle;
            }
        }
        
        // All indices from i+1 up to `low - 1` are valid pairs
        count += (low - i - 1);
    }

    return count;
};