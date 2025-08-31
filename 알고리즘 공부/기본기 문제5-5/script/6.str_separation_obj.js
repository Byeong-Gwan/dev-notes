/**
 * 
### 6. **이메일 도메인 분리**

    ```
    // 이메일에서 아이디와 도메인을 분리하라. 
    // 입력: "user01@example.com" 
    // 출력: { id: "user01", domain: "example.com" }

 */

    const str = "user01@example.com";
    console.log(strSeparationObj(str));

    function strSeparationObj (str) {
        const [id, domain] = str.split('@');

        if (!id || !domain) {
            return {id: null, domain: null};
        }

        return {id, domain};
    }