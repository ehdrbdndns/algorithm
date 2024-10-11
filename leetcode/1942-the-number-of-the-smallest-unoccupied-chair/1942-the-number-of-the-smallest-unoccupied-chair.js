/**
 * @param {number[][]} times
 * @param {number} targetFriend
 * @return {number}
 */
var smallestChair = function(times, targetFriend) {
    // n
    const mapOfArrivedTime = new Map();
    for(let friend = 0; friend < times.length; friend++) {
        mapOfArrivedTime.set(times[friend][0], friend);
    }

    // sort by arrived time (nLog n)
    const sortedTimesByArriveTime = times.sort((a, b) => {
        return a[0] - b[0];
    })

    // console.log(mapOfArrivedTime);
    // console.log(sortedTimesByArriveTime);
    // console.log("===")

    const mapOfFriends = new Map();
    const mapOfChairs = new Map();
    for(let i = 0; i < sortedTimesByArriveTime.length; i++) {
        const [arrivedTime, leavedTime] = sortedTimesByArriveTime[i];
        const friend = mapOfArrivedTime.get(arrivedTime);

        // get smallest chair
        let smallestChair = 0;
        while(true) {
            
            if(!mapOfChairs.has(smallestChair)) {
                break;
            } else {
                const leavedTime = mapOfChairs.get(smallestChair);
                
                if(arrivedTime >= leavedTime) {
                    mapOfChairs.delete(smallestChair);
                    break;
                }
            }

            smallestChair++;
        }

        // set chair
        mapOfChairs.set(smallestChair, leavedTime);
        mapOfFriends.set(friend, smallestChair);
    }

    return mapOfFriends.get(targetFriend);
};