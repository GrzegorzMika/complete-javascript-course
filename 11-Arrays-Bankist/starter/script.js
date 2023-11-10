'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2023-11-09T23:36:17.929Z',
        '2023-11-10T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];


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

const dateOptions = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
}

const createUsernames = function (accounts) {
    accounts.forEach(function (account) {
        account.username = account.owner.toLowerCase().split(' ').map(name => name[0]).join('')
    })
};
createUsernames(accounts)

const formatMovementsDates = function (date, locale) {
    const daysPassed = calcDayPassed(new Date(), date)
    if (daysPassed == 0) return 'Today'
    if (daysPassed == 1) return 'Yesterday'
    if (daysPassed <= 7) return `${daysPassed} days ago`
    return new Intl.DateTimeFormat(locale, dateOptions).format(date)
}
const displayMovements = function (account, sort = false) {
    const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;
    containerMovements.innerHTML = ""
    const formatter = new Intl.NumberFormat(account.locale, {
        style: "currency",
        currency: account.currency,
    });
    movs.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__date">${formatMovementsDates(new Date(account.movementsDates[i]), account.locale)}</div>
            <div class="movements__value">${formatter.format(mov)}</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    })
};

const calcDisplayBalance = function (account) {
    const formatter = new Intl.NumberFormat(account.locale, {
        style: "currency",
        currency: account.currency,
    })
    account.balance = account.movements.reduce((acc, cur) => acc + cur, 0)
    labelBalance.textContent = formatter.format(account.balance)
};

const calcDisplaySummary = function (account) {
    const formatter = new Intl.NumberFormat(account.locale, {
        style: "currency",
        currency: account.currency,
    })
    labelSumIn.textContent = formatter.format(account.movements.filter(mov => mov > 0).reduce((acc, cur) => acc + cur, 0))
    labelSumOut.textContent = formatter.format(Math.abs(account.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur, 0)))
    labelSumInterest.textContent = formatter.format(account.movements.filter(mov => mov > 0).map(mov => mov * account.interestRate / 100).filter(mov => mov > 1).reduce((acc, cur) => acc + cur, 0))
}

const updateUI = function (account) {
    displayMovements(account)
    calcDisplayBalance(account);
    calcDisplaySummary(account);
}

const calcDayPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 3600 * 24))
const startLogoutTimer = function () {
    let logoutTime = 100;
    const tick = function () {
        const min = String(Math.trunc(logoutTime / 60)).padStart(2, '0');
        const sec = String(logoutTime % 60).padStart(2, '0');
        labelTimer.textContent = `${min}:${sec}`;
        if (logoutTime <= 0) {
            containerApp.style.opacity = '0';
            inputLoginPin.value = inputLoginUsername.value = '';
            inputLoginPin.blur();
            labelWelcome.textContent = `Log in to get started`
            clearInterval(logoutTimer)
        }
        logoutTime--;
    }
    tick()
    const logoutTimer = setInterval(tick, 1000)
    return logoutTimer
}

let currentAccount, logoutTimer;
btnLogin.addEventListener('click', function (e) {
    e.preventDefault()
    if (logoutTimer) {
        clearInterval(logoutTimer)
    }
    logoutTimer = startLogoutTimer()
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, dateOptions).format(new Date())
    if (currentAccount?.pin === +inputLoginPin.value) {
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = '100';
        updateUI(currentAccount)
        inputLoginPin.value = inputLoginUsername.value = '';
        inputLoginPin.blur();
    }
})

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault()
    const amount = +inputTransferAmount.value
    const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value)
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    if (amount > 0 && receiverAccount && currentAccount.balance >= amount && receiverAccount?.username !== currentAccount.username) {
        currentAccount.movements.push(-amount)
        currentAccount.movementsDates.push(new Date().toISOString())
        receiverAccount.movements.push(amount)
        receiverAccount.movementsDates.push(new Date().toISOString())
        updateUI(currentAccount)
    }
    clearInterval(logoutTimer)
    logoutTimer = startLogoutTimer()
})

btnLoan.addEventListener('click', function (e) {
    e.preventDefault()
    const amount = Math.floor(+inputLoanAmount.value)
    if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
        setTimeout(function () {
            currentAccount.movements.push(amount)
            currentAccount.movementsDates.push(new Date().toISOString())
            updateUI(currentAccount)
        }, 2500)
    }
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    clearInterval(logoutTimer)
    logoutTimer = startLogoutTimer()
})

btnClose.addEventListener('click', function (e) {
    e.preventDefault()
    if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username)
        accounts.splice(index, 1)
        labelWelcome.textContent = `Log in to get started`
        containerApp.style.opacity = '0';
    }
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
})

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
    clearInterval(logoutTimer)
    logoutTimer = startLogoutTimer()
})
