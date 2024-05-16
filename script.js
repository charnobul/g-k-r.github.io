let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 1;
let farms = localStorage.getItem('farms') ? JSON.parse(localStorage.getItem('farms')) : [0, 0, 0];
let button = document.getElementById('clicker-button');
let shopButton = document.getElementById('toggle-shop');
let buyButtons = document.getElementsByClassName('buy-farm');
let farmQuantities = document.getElementsByClassName('farm-quantity');
let resetButton = document.getElementById('reset-button');
let clickSound = new Audio('sounds/2e371cbd1ce9be1.mp3'); // Замените на путь к вашему аудиофайлу

function updateBalance(newBalance) {
    localStorage.setItem('balance', newBalance.toFixed(2));
    document.getElementById('balance').textContent = 'Баланс: ' + newBalance.toFixed(2) + ' гривен';
}

document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(2) + ' гривен';
let farmCounters = document.getElementsByClassName('farm-counter');
for (let i = 0; i < farmCounters.length; i++) {
    farmCounters[i].textContent = farms[i];
}

button.addEventListener('touchstart', function() {
    button.style.transform = 'scale(0.95)';
});

button.addEventListener('touchend', function() {
    button.style.transform = 'scale(1)';
});

button.addEventListener('click', function() {
    balance += 0.01;
    updateBalance(balance);

    if (window.navigator && typeof window.navigator.vibrate === 'function') {
        window.navigator.vibrate(100);
    }
    clickSound.play();
});

shopButton.addEventListener('click', function() {
    let shop = document.getElementById('shop');
    if (shop.classList.contains('hidden')) {
        shop.classList.remove('hidden');
        shop.classList.add('visible');
    } else {
        shop.classList.remove('visible');
        shop.classList.add('hidden');
    }
});

for (let i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener('click', function() {
        let quantity = parseInt(farmQuantities[i].value);
        let cost = i === 0 ? 1 : i === 1 ? 100 : 10000;
        let income = i === 0 ? 0.01 : i === 1 ? 1 : 100;
        let totalCost = cost * quantity;

        if (balance >= totalCost) {
            balance -= totalCost;
            farms[i] += quantity;
            updateBalance(balance);
            farmCounters[i].textContent = farms[i];
            localStorage.setItem('farms', JSON.stringify(farms));
        } else {
            alert('Недостаточно средств для покупки фермы');
        }
    });
}

setInterval(function() {
    balance += 0.01 * farms[0] + 1 * farms[1] + 100 * farms[2];
    updateBalance(balance);
}, 1000);

resetButton.addEventListener('click', function() {
    if (confirm('Вы уверены, что хотите обнулить всё?')) {
        balance = 1;
        farms = [0, 0, 0];
        updateBalance(balance);
        for (let i = 0; i < farmCounters.length; i++) {
            farmCounters[i].textContent = farms[i];
        }
        localStorage.setItem('farms', JSON.stringify(farms));
    }
});
