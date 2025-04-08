class Solution {
public:
    int maxArea(vector<int>& height) {
        // rear와 tail의 포인트 두 가지를 만들고 서로 양 끝에서 시작
        // 더 작은 막대기를 소유한 포인트가 움지기도록 설정
        // 서로의 포인트가 맞닿을 때까지 이동,
        // 이동하면서 계산한 넓이 값 중 가장 큰 값을 반환
        int result = 0;

        int rear = 0;
        int tail = height.size() - 1;
        while(rear != tail) {
            int vertical = height[rear] < height[tail] ? height[rear] : height[tail];
            int horizon = tail - rear;
            int area = vertical * horizon;
            
            result = area < result ? result : area;

            if(height[rear] < height[tail]) {
                // move rear point
                rear++;
            } else {
                // move tail point
                tail--;
            }
        }

        return result;
    }
};