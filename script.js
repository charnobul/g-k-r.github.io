let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 1;
let farms = localStorage.getItem('farms') ? JSON.parse(localStorage.getItem('farms')) : [0, 0, 0];
let upgrades = localStorage.getItem('upgrades') ? parseInt(localStorage.getItem('upgrades')) : 0;
let clickValue = 0.01 + upgrades * 0.1;
let promoUsed = localStorage.getItem('promoUsed') ? JSON.parse(localStorage.getItem('promoUsed')) : false;
const encryptedPromoCode = "SkQ4R0U5Mkg="; // base64 encoded "JD8GE92H"
let button = document.getElementById('clicker-button');
let shopButton = document.getElementById('toggle-shop');
let buyButtons = document.getElementsByClassName('buy-farm');
let farmQuantities = document.getElementsByClassName('farm-quantity');
let totalCosts = document.getElementsByClassName('total-cost');
let buyUpgradeButton = document.getElementsByClassName('buy-upgrade')[0];
let upgradeQuantity = document.getElementsByClassName('upgrade-quantity')[0];
let upgradeTotalCost = document.getElementsByClassName('total-cost')[3];
let upgradeCounter = document.getElementsByClassName('upgrade-counter')[0];
let resetButton = document.getElementById('reset-button');
let promoCodeInput = document.getElementById('promo-code-input');
let activatePromoCodeButton = document.getElementById('activate-promo-code');
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
upgradeCounter.textContent = upgrades;

button.addEventListener('touchstart', function() {
    button.style.transform = 'scale(0.95)';
});

button.addEventListener('touchend', function() {
    button.style.transform = 'scale(1)';
});

button.addEventListener('click', function() {
    balance += clickValue;
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

for (let i = 0; i < farmQuantities.length; i++) {
    farmQuantities[i].addEventListener('input', function() {
        let quantity = parseInt(farmQuantities[i].value);
        let cost = i === 0 ? 1 : i === 1 ? 100 : 10000;
        totalCosts[i].textContent = 'Итоговая цена: ' + (cost * quantity) + ' гривен';
    });
}

for (let i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener('click', function() {
        let quantity = parseInt(farmQuantities[i].value);
        let cost = i === 0 ? 1 : i === 1 ? 100 : 10000;
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

upgradeQuantity.addEventListener('input', function() {
    let quantity = parseInt(upgradeQuantity.value);
    upgradeTotalCost.textContent = 'Итоговая цена: ' + (1 * quantity) + ' гривен';
});

buyUpgradeButton.addEventListener('click', function() {
    let quantity = parseInt(upgradeQuantity.value);
    let totalCost = 1 * quantity;

    if (balance >= totalCost) {
        balance -= totalCost;
        upgrades += quantity;
        clickValue = 0.01 + upgrades * 0.1;
        updateBalance(balance);
        upgradeCounter.textContent = upgrades;
        localStorage.setItem('upgrades', upgrades);
    } else {
        alert('Недостаточно средств для покупки улучшения');
    }
});

setInterval(function() {
    balance += 0.01 * farms[0] + 1 * farms[1] + 100 * farms[2];
    updateBalance(balance);
}, 1000);

resetButton.addEventListener('click', function() {
    if (confirm('Вы уверены, что хотите обнулить всё?')) {
        balance = 1;
        farms = [0, 0, 0];
        upgrades = 0;
        clickValue = 0.01;
        updateBalance(balance);
        for (let i = 0; i < farmCounters.length; i++) {
            farmCounters[i].textContent = farms[i];
        }
        upgradeCounter.textContent = upgrades;
        localStorage.setItem('farms', JSON.stringify(farms));
        localStorage.setItem('upgrades', upgrades);
        localStorage.setItem('promoUsed', false);
    }
});

activatePromoCodeButton.addEventListener('click', function() {
    if (!promoUsed && btoa(promoCodeInput.value) === encryptedPromoCode) {
        balance += 10000000000;
        updateBalance(balance);
        promoUsed = true;
        localStorage.setItem('promoUsed', JSON.stringify(promoUsed));
    } else {
        alert('Неверный промокод или он уже был использован');
    }
});

// Добавление новых промокодов (example)
// let newPromoCode = "NEWCODE123";
// let newPromoReward = 5000;
// let encryptedNewPromoCode = btoa(newPromoCode); // зашифрованный новый промокод
