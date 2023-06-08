//Selecion de lista.
let list = document.querySelectorAll(".navegacion li");

function activeLink() {
    list.forEach(item => {
        item.classList.remove("hovered");
    });
    this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover",activeLink));

//Menu toggle

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
};

// Datos de usuarios
const users = [
    { username: 'Luis', password: '1234', balance: 100000, transactions: [] },
    { username: 'Carlos', password: 'abcd', balance: 250000, transactions: [] },
    { username: 'admin', password: '12345A', balance: 22000000, transactions: [] }
];



// Elementos del DOM
const loginContainer = document.getElementById('login-container');
const atmContainer = document.getElementById('atm-container');
const balanceContainer = document.getElementById('balance-container');
const balanceElement = document.getElementById('balance');
const transactionListElement = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const logoutButton = document.getElementById('logout');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const amountInput = document.getElementById('amount');
const transactionTypeInput = document.getElementById('transaction-type');

let currentUser = null;

// Mostrar el contenedor de inicio de sesión y ocultar el contenedor del cajero automático
function showLoginContainer() {
    loginContainer.style.display = 'block';
    atmContainer.style.display = 'none';
}

// Mostrar el contenedor del cajero automático y ocultar el contenedor de inicio de sesión
function showATMContainer() {
    loginContainer.style.display = 'none';
    atmContainer.style.display = 'block';
   
}


// Actualizar el saldo mostrado en la página
function updateBalance() {
    balanceElement.textContent = `$ ${currentUser.balance}`;
}

// Actualizar la lista de movimientos mostrada en la página
function updateTransactionList() {
    transactionListElement.innerHTML = '';

    currentUser.transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.type.toUpperCase()}: $${transaction.amount}`;
        transactionListElement.appendChild(listItem);
    });
}

// Procesar una transacción (consignar saldo o retirar saldo)
function processTransaction(amount, type) {
    if (type === 'Consignacion') {
        currentUser.balance += amount;
    } else if (type === 'Retiro') {
        if (amount > currentUser.balance) {
            alert('Saldo insuficiente');
            return;
        }
        currentUser.balance -= amount;
    } else if(type === 'Transferencia'){
        if (amount > currentUser.balance) {
            alert('Saldo insuficiente');
            return;
        }
        currentUser.balance -= amount;
    }

    const transaction = { amount, type };
    currentUser.transactions.push(transaction);

    updateBalance();
    updateTransactionList();
}

// Procesar el inicio de sesión
function login(event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        updateBalance();
        updateTransactionList();
        showATMContainer();
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }

    usernameInput.value = '';
    passwordInput.value = '';
}

// Procesar la transacción enviada desde el formulario
function submitTransaction(event) {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const type = transactionTypeInput.value;

    processTransaction(amount, type);

    amountInput.value = '';
}

// Procesar el cierre de sesión
function logout() {
    currentUser = null;
    showLoginContainer();
}

// Event listeners
document.getElementById('login-form').addEventListener('submit', login);
transactionForm.addEventListener('submit', submitTransaction);
logoutButton.addEventListener('click', logout);

// Mostrar el contenedor de inicio de sesión al cargar la página
showLoginContainer();

