'use strict';

console.log('Test start')
setTimeout(()=>console.log('0 sec timer', 0))
Promise.resolve('Resolved promise 1'). then(res=>{
  console.log(res);
})

Promise.resolve('Resolved Promised 2').then(res=>{
  for (let i =0 ; i <10; i++){
    console.log(res)
  }
})

console.log(`Test end`);

// code outside of any callback runs first
// synchronous code comes first
// Test Start
// Test End
//micro tasks which are callbacks 
//related to promises has priority over the regular callback queue
// Resolved promise 1
// 0 sec timer // Note that you cannot rely on the 0 sec timer for precision

