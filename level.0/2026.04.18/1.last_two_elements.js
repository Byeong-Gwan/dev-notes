/** 마지막 두 원소

 * 문제 설명
   정수 리스트 num_list가 주어질 때, 
   마지막 원소가 그전 원소보다 크면 마지막 원소에서 그전 원소를 뺀 값을 
   마지막 원소가 그전 원소보다 크지 않다면 마지막 원소를 두 배한 값을 
   추가하여 return하도록 solution 함수를 완성해주세요.

 * 제한사항
   2 ≤ num_list의 길이 ≤ 10
   1 ≤ num_list의 원소 ≤ 9

 * 입출력 예
   num_list	result
   [2, 1, 6]	[2, 1, 6, 5]
   [5, 2, 1, 7, 5]	[5, 2, 1, 7, 5, 10]
 */

// 배열 중 가장 마지막 원소의 값 
// 배열의 가장 마지막 원소 전 원소 값
// 마지막 원소 > 그전 원소 => 마지막 원소 - 그전 원소
// 마지막 원소 < 그전 원소 => 마지막 원소 * 2
function solution(num_list) {
   const last = num_list[num_list.length - 1];
   const prev = num_list[num_list.length - 2];
   
   let result = last > prev ? last - prev : last * 2;
      
   num_list.push(result);
   return num_list
}

console.log(solution([2, 1, 6]));
console.log(solution([5, 2, 1, 7, 5]));