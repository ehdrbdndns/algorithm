/**
 * @param {character[][]} box
 * @return {character[][]}
 */
var rotateTheBox = function (box) {
    // 1. m만큼 돌면서 copy_box에 다음과 같은 로직으로 값 갱신
    //    obstacle 만날 때 까지 '#' 개수를 따로 기록함과 동시에 '#'은 '.'로 변형
    //    obstacle 만나면 '#' 개수만큼 obstacle 앞쪽에 값 갱신
    //    obstacle은 '#' 이거나, '*'이거나 배열의 끝임
    // 2. rotate 하기
    //    m과 n을 서로 엇갈리게 하여 rotate 함수 구현

    // 시간 복잡도 O(n)

    const M = box.length;
    const N = box[0].length;
    let copy_box = new Array(M);

    for (let i = 0; i < M; i++) {
        copy_box[i] = new Array(N);

        let stone_count = 0;
        for (let j = 0; j < N; j++) {
            const val = box[i][j];

            if (val === '#') {
                // stone 개수 카운트
                stone_count++;
                copy_box[i][j] = '.';
            } else if (val === '*') {
                // gravity 작용
                for (let k = j - stone_count; k < j; k++) {
                    copy_box[i][k] = '#';
                }
                stone_count = 0;
                copy_box[i][j] = '*'
            } else {
                // 빈 곳
                copy_box[i][j] = '.';
            }
        }

        // console.log("before")
        // console.log(copy_box);

        // gravity
        for (let k = N - stone_count; k < N; k++) {
            copy_box[i][k] = '#';
        }
        
        // console.log("after")
        // console.log(copy_box);
    }


    // console.log("copy_box");
    // console.log(copy_box)

    // rotate
    let rotated_box = new Array(N);
    for(let i = 0; i < N; i++) {
        rotated_box[i] = new Array(M); 

        for(let j = 0; j < M; j++) {
            rotated_box[i][j] = copy_box[M - 1 - j][i];
        }
    }

    return rotated_box;
};