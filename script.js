'use strict';

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log(`Lottery draw is happening 🔮`);
//   setTimeout(function () {
//     if (Math.random() > 0.5) {
//       resolve(`You won the lottery!💰 `)
//     }
//     else {
//       reject(new Error(`You lost your money!💩 `))
//     }
//   }, 2000)
// })

// lotteryPromise.then(res=>{
//   console.log(res);
// }).catch(err=>{
//   console.error(err);
// })

//Promisify the setTimeout function. Real world example

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}

// wait(1)
//   .then(() => {
//     console.log(`I waited for 1 seconds`);
//     return wait(1)
//   })
//   .then(() => {
//     console.log(`I waited for 2 seconds`);
//     return wait(1)
//   })
//   .then(() => {
//     console.log(`I waited for 3 seconds`);
//     return wait(1)
//   })

Promise.resolve(`You won`).then(res=>{console.log(res);
}) // this triggers immediately and prints 'You won'

Promise.reject(new Error(`You lost`)).catch(err=>{console.error(err);
}) // this triggers immediately and prints 'You lost'

