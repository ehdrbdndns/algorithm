class NumberContainers {
    var indexToNumber = [Int: Int]()
    var numberToIndices = [Int: Heap<Int>]()

    func change(_ index: Int, _ number: Int) {
        indexToNumber[index] = number
        numberToIndices[number, default: Heap()].insert(index)
    }
    
    func find(_ number: Int) -> Int {
        while let index = numberToIndices[number]?.min {
            if indexToNumber[index] == number { return index }
            numberToIndices[number]?.popMin()
        }
        return -1
    }
}