/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
var longestDiverseString = function(a, b, c) {
    // max heap
    const maxHeap = new MaxPriorityQueue({
        priority: (letter) => letter.value
    });

    if(a !== 0) {
        maxHeap.enqueue({letter: 'a', value: a});
    }

    if(b !== 0) {
        maxHeap.enqueue({letter: 'b', value: b});
    }

    if(c !== 0) {
        maxHeap.enqueue({letter: 'c', value: c});
    }

    let happy = '';
    let prevLetter = '';
    while(!maxHeap.isEmpty()) {
        // pop
        let {letter, value} = maxHeap.dequeue().element;

        let subTwoNum = true;

        // check edge
        if(letter === prevLetter) {
            const elem = maxHeap.dequeue();

            if(elem === null) {
                break;
            }

            if(value !== elem.element.value) {
                subTwoNum = false;
            }

            maxHeap.enqueue({letter, value});
            letter = elem.element.letter;
            value = elem.element.value;
        }

        // update happy
        if(value > 1) {
            let newValue = 0;
            if(subTwoNum) {
                happy += (letter + letter);
                newValue = value - 2;
            } else {
                happy += letter;
                newValue = value - 1;
            }
            
            if(newValue !== 0) {
                maxHeap.enqueue({letter, value: newValue})
            }
        } else if(value === 1) {
            happy += letter;
        }

        prevLetter = letter;
    }

    // return longest possible happy string
    return happy;
};