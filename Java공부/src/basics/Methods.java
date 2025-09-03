package basics;

public class Methods {
    public static void main(String[] args) {
        int a = 7, b = 5;
        System.out.println("add = " + add(a, b));
        System.out.println("max = " + max(a, b));
        hello("Java");
    }

    static int add(int x, int y) {
        return x + y;
    }

    static int max(int x, int y) {
        return (x > y) ? x : y;
    }

    static void hello(String name) {
        System.out.println("Hello, " + name + "!");
    }
}
