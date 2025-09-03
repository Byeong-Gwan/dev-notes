package basics;

public class ControlFlow {
    public static void main(String[] args) {
        int score = 83;

        // if-else
        if (score >= 90) {
            System.out.println("A");
        } else if (score >= 80) {
            System.out.println("B");
        } else if (score >= 70) {
            System.out.println("C");
        } else {
            System.out.println("D");
        }

        // switch
        int day = 3; // 1~7
        switch (day) {
            case 1 -> System.out.println("Mon");
            case 2 -> System.out.println("Tue");
            case 3 -> System.out.println("Wed");
            case 4 -> System.out.println("Thu");
            case 5 -> System.out.println("Fri");
            case 6, 7 -> System.out.println("Weekend");
            default -> System.out.println("Unknown");
        }
    }
}
