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

const UpdateUI = function () {
  //Calculate and Display Current Balane
  calcDisplayBalance(currentAccounts);

  //Calculate and Display Current Summary
  calcDisplaySummary(currentAccounts);

  //Calculate and Display Transaction
  displayMovements(currentAccounts);
};

// Display Transaction
const displayMovements = function (currentAccounts, sort = false) {
  // const movements = account1.movements;
  containerMovements.innerHTML = '';

  const movement = sort
    ? currentAccounts.movements.slice().sort((a, b) => a - b)
    : currentAccounts.movements;
  movement.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculate Display Balance
const calcDisplayBalance = function (currentAccounts) {
  currentAccounts.balance = currentAccounts.movements.reduce(
    (accr, mov) => accr + mov,
    0
  );
  labelBalance.textContent = `${currentAccounts.balance.toFixed(2)} €`;
};

// Calculate Summary Balance
const calcDisplaySummary = function (currentAccounts) {
  // Calculate Income Balance
  const income = currentAccounts.movements
    .filter(mov => mov > 0)
    .reduce((accr, mov) => accr + mov, 0);
  labelSumIn.textContent = income.toFixed(2);

  // Calculate Outcome Balance
  const outcome = currentAccounts.movements
    .filter(mov => mov < 0)
    .reduce((accr, mov) => accr + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome.toFixed(2))}`;

  // Calculate Interest Balance
  const interest = currentAccounts.movements
    .filter(mov => mov > 0)
    .map(int => (int * currentAccounts.interestRate) / 100)
    .filter(int => int > 0)
    .reduce((accr, int) => accr + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest.toFixed(2))}`;
};

// App Event Handler
// Log in Feature
let currentAccounts;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccounts = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  if (currentAccounts?.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 100;
    //Display Welcome
    labelWelcome.textContent = `Welcome Back 
    ${currentAccounts.owner.split(' ')[0]}`;
  }

  UpdateUI();

  // Clear Content Log In
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
});

// Transfer Feature
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const receiveAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  const amount = +inputTransferAmount.value;
  if (
    amount <= currentAccounts.balance &&
    amount > 0 &&
    receiveAcc.userName !== currentAccounts.userName
  ) {
    currentAccounts.movements.push(-amount);
    receiveAcc.movements.push(amount);

    // UpdateUI
    UpdateUI();

    // Clear Content Transfer
    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferAmount.blur();
  }
});

// Loan Feature
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccounts.movements.some(mov => mov >= amount * 0.1)
  ) {
    currentAccounts.movements.push(amount);

    // UpdateUI
    UpdateUI();

    // Clear Content Transfer
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});

labelBalance.addEventListener('click', function () {
  const rows = [...document.querySelectorAll('.movements__row')];
  rows.forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'darksalmon';
    }
  });
});

// Sorting Feature
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccounts, !sorted);
  sorted = !sorted;
});

// Close Account Feature
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccounts.userName &&
    +inputClosePin.value === currentAccounts.pin
  ) {
    // Close UI
    containerApp.style.opacity = 0;
    const index = accounts.findIndex(
      acc => acc.userName === currentAccounts.userName
    );
    accounts.splice(index, 1);
  }
});

// For Admin Panel
// Total Accounts Balance
const totalBalanceChaining = accounts
  .flatMap(mov => mov.movements)
  .reduce((accr, mov) => accr + mov, 0);
console.log(totalBalanceChaining);
