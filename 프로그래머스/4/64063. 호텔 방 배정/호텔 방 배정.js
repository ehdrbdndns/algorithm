function solution(k, room_number) {
    var answer = [];
    let map = new Map()
    
    function find(room) {
        if(!map.has(room)) {
            map.set(room, room + 1)
            return room
        }
        
        let finded_room = find(map.get(room))
        map.set(room, finded_room + 1)
        return finded_room
    }
    
    for(let room of room_number) {
        answer.push(find(room))
    }
    
    return answer;
}