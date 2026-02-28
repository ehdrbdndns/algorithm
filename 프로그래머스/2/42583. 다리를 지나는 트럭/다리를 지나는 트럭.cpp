#include <string>
#include <vector>
using namespace std;

int solution(int bridge_length, int weight, vector<int> truck_weights) {
    // bridge[i] = 현재 i번째 칸(시간 슬롯)에 올라가 있는 트럭 무게(없으면 0)
    vector<int> bridge(bridge_length, 0);

    int time = 0;
    int curWeight = 0;

    int idx = 0;          // 원형 큐의 현재 위치(= 이번 1초에 "나가는 칸"이자 "들어오는 칸")
    int t = 0;            // 다음에 올릴 트럭 인덱스
    int n = (int)truck_weights.size();

    // 아직 올릴 트럭이 남아있거나, 다리 위에 트럭이 하나라도 남아있으면 계속
    while (t < n || curWeight > 0) {
        time++;

        // 1) 이번 칸에서 트럭이 내려감
        curWeight -= bridge[idx];
        bridge[idx] = 0;

        // 2) 다음 트럭을 올릴 수 있으면 올림
        if (t < n && curWeight + truck_weights[t] <= weight) {
            bridge[idx] = truck_weights[t];
            curWeight += truck_weights[t];
            t++;
        }

        // 3) 다음 칸(1초 흐름)
        idx++;
        if (idx == bridge_length) idx = 0;
    }

    return time;
}