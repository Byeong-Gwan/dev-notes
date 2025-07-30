/**
 * 
#### 4️⃣ **객체 배열에서 특정 key로 그룹화**

    ``` 
    입력: [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}, {type: 'vegetable', name: 'carrot'}]
    -> 출력: {fruit: ['apple', 'banana'], vegetable: ['carrot']}
    ```
 */

    const obj = [{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}, {type: 'vegetable', name: 'carrot'}];
    console.log(objGroup(obj));

    function objGroup (obj) {
        const result = {};

        for (let i = 0; i < obj.length; i++) {
            const item = obj[i];
            const key = item.type;
            const value = item.name;

            if (!result[key]) {
                result[key] = [];
            }

            result[key].push(value);
        }
        return result;
    }