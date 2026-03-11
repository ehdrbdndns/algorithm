function solution(sizes) {
    var answer = 0;
    
    let maxW = 0
    let maxH = 0
    
    for(const [w, h] of sizes) {
        const bigger = Math.max(w, h)
        const smaller = Math.min(w, h)
        
        maxW = Math.max(maxW, bigger)
        maxH = Math.max(maxH, smaller)
    }
    
    return maxW * maxH;
}