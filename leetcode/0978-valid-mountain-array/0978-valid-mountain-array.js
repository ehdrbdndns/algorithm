/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function(arr) {
    // Check for edge case
    if(arr.length <= 2 || arr[0] > arr[1]) {
        return false;
    }
    
    let isUp = true; 
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === arr[i+1])
            return false;
        if(isUp) {
            if(i === arr.length - 1) {
                return false
            }
            if(arr[i] > arr[i+1]) {
                isUp = false;
            }
        } else {
            if(arr[i] < arr[i+1]) {
                return false;
            }         
        }
    }
    return true
};