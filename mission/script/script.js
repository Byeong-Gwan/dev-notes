/**
 * 1. 명언 1 ~ 10 개 출력
 * https://korean-advice-open-api.vercel.app/api/advice
 * 
 *  async는 비동기 함수로, await를 통해 특정 비동기 작업이 완료될 때까지 기다릴 수 있다.
    Promise.all은 여러 개의 비동기 작업을 병렬로 처리하고, 모두 완료될 때까지 기다린 후 결과를 배열로 반환한다.
    forEach로 10개의 명언을 하나씩 <li> 태그로 만들어 <ul>에 추가하며,  
    전체 함수는 DOMContentLoaded 이벤트를 통해 HTML이 로드된 후 실행되도록 한다.
 
  * 2. 정렬, 순서 출력
    - 문자열의 길이 sort 
    - 명언 앞에 순서 입력하고
 */


async function fetchAdvice() {
    const responses = await Promise.all(
      Array.from({ length: 10 }).map(() =>
        fetch('https://korean-advice-open-api.vercel.app/api/advice').then(res => res.json())
      )
    );
    console.log(responses);
    
    const result = responses.sort((a, b) => {
        return a.message.length - b.message.length;
    });

    const list = document.getElementById('fe-advice-list');

    result.forEach((e, idx) => {
        const li = document.createElement('ul');
        li.textContent = `${idx + 1}. "${e.message}" - ${e.author}`;
        list.appendChild(li);
    });
  }

  document.addEventListener('DOMContentLoaded', fetchAdvice);



  