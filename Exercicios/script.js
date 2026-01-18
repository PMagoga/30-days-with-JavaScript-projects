/*let p = new Promise(function (resolve, reject) {
  setTimeout(() => resolve('abc'), 100);
});
async function afn() {
  console.log('def');
  let x = await p;
  console.log(x);
}
afn();
console.log('ghi');*/

const arr = ["apple", "banana", "cherry", "date"];
const slicedArr = arr.slice(1, 3);
console.log(slicedArr);

const fruits = ["apple", "banana", "cherry", "apple", "orange"];

fruits.splice(0, 1);

console.log(fruits);




const numbers = [10, 20, 30, 40];
const index = numbers.indexOf(20);
console.log(index);

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2);

console.log(numbers.inde);