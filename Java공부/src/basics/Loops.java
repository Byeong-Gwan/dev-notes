package basics;

public class Loops {
    public static void main(String[] args) {
        // for
        for (int i = 1; i <= 5; i++) {
            System.out.println("for i=" + i);
        }

        // while
        int n = 3;
        while (n > 0) {
            System.out.println("while n=" + n);
            n--;
        }

        // enhanced for (foreach)
        int[] arr = {10, 20, 30};
        for (int v : arr) {
            System.out.println("v=" + v);
        }
    }
}
