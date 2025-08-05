/**
 * 
#### 7️⃣ **괄호 문자열 유효성 검사 (스택)**

    // 입력: "(())()"  → true // 입력: "(()"     → false
 */

    const strVaildation = "(())()";

    console.log(parenthesized(strVaildation));

    function parenthesized (str) {
        const stack = [];

        for (let i = 0; i < str.length; i++) {
            if (str[i] === '(') {
                stack.push('(');
            } else if (str[i] === ')'){
                if (!stack.length) return;
                stack.pop();
            }
        }

        return stack.length === 0;
    }