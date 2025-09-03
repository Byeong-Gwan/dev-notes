package basics;

/**
 * Object_Ex6_1
 * @author gimbyeong-gwan
 * @version 1.0
 * @since 2025-09-03
 */
public class Object_Ex6_1 {
    public static void main(String[] args) {
        Tv t;   // Tv 인스턴스를 참조하기 위한 변수 t를 선언
        t = new Tv();   // Tv 인스턴스를 생성하고 t에 참조
        t.channel = 7;  // Tv 인스턴스의 맴버변수 channel의 값을 7로 한다. 
        t.channelDown();  // Tv 인스턴스의 channelDown() 메소드를 호출
        System.out.println("현재 체널은 " + t.channel + " 입니다.");
    }
}

// Tv 클래스 생성
class Tv {
    // Tv 인스턴스의 맴버변수 선언
    String color;
    boolean power;
    int channel;

    void power() { power = !power; }  // Tv 인스턴스의 power() 메소드
    void channelUp() { ++channel; }  // Tv 인스턴스의 channelUp() 메소드
    void channelDown() { --channel; }  // Tv 인스턴스의 channelDown() 메소드
}
