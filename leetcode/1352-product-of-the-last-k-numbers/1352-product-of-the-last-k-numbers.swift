
class ProductOfNumbers {
    var prefixStream: [Int];
    var size = 0;

    init() {
        prefixStream = [1];
        size = 0;
    }
    
    func add(_ num: Int) {
        if num == 0 {
            prefixStream = [1];
            size = 0;
        } else {
            prefixStream.append(prefixStream[size] * num);
            size += 1;
        }
    }
    
    func getProduct(_ k: Int) -> Int {
       if k > size {
            return 0
       }

       return prefixStream[size] / prefixStream[size - k]
    }
}

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * let obj = ProductOfNumbers()
 * obj.add(num)
 * let ret_2: Int = obj.getProduct(k)
 */