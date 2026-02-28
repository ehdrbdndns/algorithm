function solution(bridge_length, weight, truck_weights) {
    let time = 0
    let currentWeight = 0
    let bridge = new Array(bridge_length).fill(0)
    
    let index = 0
    let truckIndex = 0
    
    while(truckIndex < truck_weights.length || currentWeight > 0) {
        time++
        
        // 현재 칸에서 트럭 빠짐
        currentWeight -= bridge[index]
        bridge[index] = 0
        
        // 다음 트럭 넣을 수 있으면 넣기
        if(currentWeight + truck_weights[truckIndex] <= weight) {
            bridge[index] = truck_weights[truckIndex]
            currentWeight += truck_weights[truckIndex]
            truckIndex++
        }
        
        // 원형 이동
        index = (index + 1) % bridge_length
    }
    
    return time
}