'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Creating User Name
const createUserName = function (accs) {
  const user = accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUserName(accounts);

// Display Transaction
const displayMovements = function (currentAccounts) {
  // const movements = account1.movements;
  containerMovements.innerHTML = '';
  currentAccounts.movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculate Display Balance
const calcDisplayBalance = function (currentAccounts) {
  const balance = currentAccounts.movements.reduce(
    (accr, mov) => accr + mov,
    0
  );
  labelBalance.textContent = `${balance} €`;
};

// Calculate Summary Balance
const calcDisplaySummary = function (currentAccounts) {
  // Calculate Income Balance
  const income = currentAccounts.movements
    .filter(mov => mov > 0)
    .reduce((accr, mov) => accr + mov, 0);
  labelSumIn.textContent = income;

  // Calculate Outcome Balance
  const outcome = currentAccounts.movements
    .filter(mov => mov < 0)
    .reduce((accr, mov) => accr + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}`;

  // Calculate Interest Balance
  const interest = currentAccounts.movements
    .filter(mov => mov > 0)
    .map(int => (int * currentAccounts.interestRate) / 100)
    .filter(int => int > 0)
    .reduce((accr, int) => accr + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}`;
};

// Event Handler
let currentAccounts;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccounts = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  if (currentAccounts?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    //Display Welcome
    labelWelcome.textContent = `Welcome Back 
    ${currentAccounts.owner.split(' ')[0]}`;
  }

  //Calculate and Display Current Balane
  calcDisplayBalance(currentAccounts);

  //Calculate and Display Current Summary
  calcDisplaySummary(currentAccounts);

  //Calculate and Display Transaction
  displayMovements(currentAccounts);

  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////

// Coding Challenge 1
// const dogJulia = [3, 5, 2, 12, 7];
// const dogKate = [4, 1, 15, 8, 3];
// dogJulia = [9,16,6,8,3];
// dogKate = [10,5,6,1,4];

// const checkDogs = function (dogJulia, dogKate) {
//   const i = dogJulia.slice();
//   i.splice(0, 1);
//   i.splice(-2);
//   console.log(i);
//   const dogs = i.concat(dogKate);
//   console.log(dogs);
//   dogs.forEach(function (d, i) {
//     const displaydog =
//       d > 3
//         ? `Dog number ${i + 1} is an adult,and is ${d} years old`
//         : `Dog number ${i + 1} is still a puppy`;
//     console.log(displaydog);
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log('=============================================');
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUSD = 1.1;
// // const movementUSD = movements.map(function (mov) {
// //   return mov * eurToUSD;
// // });

// // console.log(movementUSD);

// const movementUSD = movements.map((mov, i) => {
//   const type = mov > 0 ? 'Deposit' : 'Withdrawl';
//   return `${i + 1} Your ${type} is ${Math.abs(mov)}`;
// });
// console.log(movementUSD);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposit = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(deposit);

// const withdraw = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log(withdraw);

// const depositForOf = [];
// const withdrawForOf = [];

// for (const mov of movements) {
//   if (mov > 0) {
//     depositForOf.push(mov);
//   } else {
//     withdrawForOf.push(mov);
//   }
// }
// console.log(depositForOf, withdrawForOf);

// const reducer = movements.reduce(function (acc, mov) {
//   return acc + mov;
// }, 0);
// console.log(reducer);

// const reducers = movements.reduce((acc, mov) => acc + mov, 0);
// console.log(reducers);

// let initialValue = 0;
// for (const mov of movements) {
//   initialValue += mov;
// }
// console.log(initialValue);

// const dogage1 = [5, 2, 4, 1, 15, 8, 3];
// const dogage2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(age => (age >= 2 ? 16 + age * 4 : 2 * age));

//   const excludeHumanAge = humanAge.filter(exclude => exclude >= 18);

//   const averageHumanAge = excludeHumanAge.reduce(
//     (accr, avg, _, arr) => accr + avg / arr.length - 1,
//     0
//   );

//   console.log(humanAge);
//   console.log(excludeHumanAge);
//   console.log(averageHumanAge);
// };

// calcAverageHumanAge(dogage1);
// calcAverageHumanAge(dogage2);

// Coding Challenge - 3
// const dogage1 = [5, 2, 4, 1, 15, 8, 3];
// const dogage2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age >= 2 ? 16 + age * 4 : 2 * age));

//   const humanAge = ages.map(age => age >= 2);

//   const excludeHumanAge = humanAge.filter(exclude => exclude >= 18);

//   const averageHumanAge = excludeHumanAge.reduce(
//     (accr, avg, _, arr) => accr + avg / arr.length - 1,
//     0
//   );

//   console.log(humanAge);
//   console.log(excludeHumanAge);
//   console.log(averageHumanAge);
// };

// calcAverageHumanAge(dogage1);
// calcAverageHumanAge(dogage2);
