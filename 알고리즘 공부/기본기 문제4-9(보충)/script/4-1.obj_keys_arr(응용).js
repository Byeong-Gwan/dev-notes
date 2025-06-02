/**
 * 
#### 4️⃣ **객체에서 value 값이 짝수인 키만 알파벳 역순으로 배열 반환**

    `// 예: {a:2, b:5, c:4} → ['c', 'a'] function evenValueKeys(obj) { }`

 */

    const obj = {a: {name: 'kbg', id: 1}, b: {name: 'ajs', id: 2}, c:{name: 'kng', id: 3}};
    console.log(evenValueKeys(obj));

    function evenValueKeys(obj) {
        const arr = Object.values(obj);
        console.log('eee',arr)

        arr.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return a.id - b.id;
        });
        return arr;
     }

     /**
      * 내림차순 Name 
      * 오름차순 id 
      */

    //  function evenValueKeys(obj) {
    //     return Object.keys(obj)
    //       .filter(key => obj[key] % 2 === 0)
    //       .sort()
    //       .reverse();
    //   }