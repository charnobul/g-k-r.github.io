let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 1;
let farms = localStorage.getItem('farms') ? JSON.parse(localStorage.getItem('farms')) : [0, 0, 0];
let upgrades = localStorage.getItem('upgrades') ? parseInt(localStorage.getItem('upgrades')) : 0;
let clickValue = 0.01 + upgrades * 0.1;
let usedPromoCodes = localStorage.getItem('usedPromoCodes') ? JSON.parse(localStorage.getItem('usedPromoCodes')) : [];
const promoCodes = {
    "SkQ4R0U5Mkg=": 10000000000,
    "SlU0VlVJVlJNSzZWTkQyUw==": 1e+300 
};

const baseFarmCosts = [1, 100, 10000];
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
        updateAllCosts();
    } else {
        shop.classList.remove('visible');
        shop.classList.add('hidden');
    }
});

function getFarmCost(baseCost, farmIndex, quantity) {
    let totalCost = 0;
    for (let i = 0; i < quantity; i++) {
        totalCost += baseCost * Math.pow(1.7, farms[farmIndex] + i);
    }
    return totalCost;
}

function updateAllCosts() {
    for (let i = 0; i < farmQuantities.length; i++) {
        let quantity = parseInt(farmQuantities[i].value) || 0;
        let baseCost = baseFarmCosts[i];
        let totalCost = getFarmCost(baseCost, i, quantity);
        totalCosts[i].textContent = 'Итоговая цена: ' + totalCost.toFixed(2) + ' гривен';
    }
    let upgradeQuantityValue = parseInt(upgradeQuantity.value) || 0;
    upgradeTotalCost.textContent = 'Итоговая цена: ' + (1 * upgradeQuantityValue) + ' гривен';
}

for (let i = 0; i < farmQuantities.length; i++) {
    farmQuantities[i].addEventListener('input', function() {
        let quantity = parseInt(farmQuantities[i].value) || 0;
        let baseCost = baseFarmCosts[i];
        let totalCost = getFarmCost(baseCost, i, quantity);
        totalCosts[i].textContent = 'Итоговая цена: ' + totalCost.toFixed(2) + ' гривен';
    });
}

for (let i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener('click', function() {
        let quantity = parseInt(farmQuantities[i].value) || 0;
        let baseCost = baseFarmCosts[i];
        let totalCost = getFarmCost(baseCost, i, quantity);

        if (balance >= totalCost) {
            balance -= totalCost;
            farms[i] += quantity;
            updateBalance(balance);
            farmCounters[i].textContent = farms[i];
            localStorage.setItem('farms', JSON.stringify(farms));
            updateAllCosts();
        } else {
            alert('Недостаточно средств для покупки фермы');
        }
    });
}

upgradeQuantity.addEventListener('input', function() {
    let quantity = parseInt(upgradeQuantity.value) || 0;
    upgradeTotalCost.textContent = 'Итоговая цена: ' + (1 * quantity) + ' гривен';
});

buyUpgradeButton.addEventListener('click', function() {
    let quantity = parseInt(upgradeQuantity.value) || 0;
    let totalCost = 1 * quantity;

    if (balance >= totalCost) {
        balance -= totalCost;
        upgrades += quantity;
        clickValue = 0.01 + upgrades * 0.1;
        updateBalance(balance);
        upgradeCounter.textContent = upgrades;
        localStorage.setItem('upgrades', upgrades);
        updateAllCosts();
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
        localStorage.setItem('usedPromoCodes', JSON.stringify([]));
        updateAllCosts();
    }
});

activatePromoCodeButton.addEventListener('click', function() {
    let inputCode = promoCodeInput.value;
    let encryptedCode = btoa(inputCode);
    if (!usedPromoCodes.includes(encryptedCode) && promoCodes[encryptedCode]) {
        balance += promoCodes[encryptedCode];
        updateBalance(balance);
        usedPromoCodes.push(encryptedCode);
        localStorage.setItem('usedPromoCodes', JSON.stringify(usedPromoCodes));
    } else {
        alert('Неверный промокод или он уже был использован');
    }
});

// Добавление новых промокодов (example)
// let newPromoCode = "NEWCODE123";
// let newPromoReward = 5000;
// let encryptedNewPromoCode = btoa(newPromoCode); // зашифрованный новый промокод
// promoCodes[encryptedNewPromoCode] = newPromoReward;
