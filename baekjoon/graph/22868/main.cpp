#include <iostream>
#include <queue>
#include <algorithm>
#include <vector>
#define MAX 10005

using namespace std;
int N, M, S, E;
vector<int> map[MAX];
int path[MAX];
int visited[MAX];
int answer = 0;

int BFS(int A, int B) {
	queue<pair<int, int> > Q;
	visited[A] = true;
	Q.push(make_pair(A, 0));

	while (!Q.empty()) {
		int curX = Q.front().first;
		int curCost = Q.front().second;
		Q.pop();

		for (int i = 0; i < map[curX].size(); i++) {
			int nextX = map[curX][i];
			if (!visited[nextX]) {
				visited[nextX] = true;
				path[nextX] = curX;
				Q.push(make_pair(nextX, curCost + 1));
			}
			if (nextX == B) {
				return curCost + 1;
			}
		}
	};

	return 0;
}

void init() {
	for (int i = 1; i <= N; i++) {
		visited[i] = false;
	}
	int K = path[E];
	while (1) {
		visited[K] = true;
		K = path[K];
		if (K == 0) {
			break;
		}
	};
}

int main() {
	cin >> N >> M;
	for (int i = 0; i < M; i++) {
		int X, Y;
		cin >> X >> Y;
		map[X].push_back(Y);
		map[Y].push_back(X);
	}
	for (int i = 1; i <= N; i++) {
		sort(map[i].begin(), map[i].end());
	}
	cin >> S >> E;
	answer += BFS(S, E);
	init();
	answer += BFS(E, S);
	cout << answer << "\n";

	return 0;
}