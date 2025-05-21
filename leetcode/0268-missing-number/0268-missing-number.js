/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {

    nums.push(nums.length);
    console.log(nums);

    let i = 0;
    while(i < nums.length) {
        console.log(i);

        let a = nums[i];
        let b = nums[a];

        if(a == b) {
            i++;
            continue;
        }

        if(nums[i] != i) {
            nums[i] = b;
            nums[a] = a;
        } else {
            i++
        }
    }

    console.log(nums);
    let result = nums.length - 1;
    for(let i = 0; i < nums.length; i++) {
        if(i !== nums[i]) {
            result = i;
        }
    }

    return result;
};