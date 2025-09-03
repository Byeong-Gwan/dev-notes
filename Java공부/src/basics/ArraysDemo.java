package basics;

import java.util.Arrays;

public class ArraysDemo {
    public static void main(String[] args) {
        int[] nums = new int[5]; // 0으로 초기화
        for (int i = 0; i < nums.length; i++) {
            nums[i] = (i + 1) * 10;
        }

        System.out.println("length=" + nums.length);
        System.out.println("Arrays.toString=" + Arrays.toString(nums));

        // 2차원 배열
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6}
        };
        for (int[] row : grid) {
            System.out.println(Arrays.toString(row));
        }
    }
}
