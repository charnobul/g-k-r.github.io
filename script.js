let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 1;
let farms = localStorage.getItem('farms') ? JSON.parse(localStorage.getItem('farms')) : [0, 0, 0];
let farmBaseCosts = [1, 100, 10000];
let upgrades = localStorage.getItem('upgrades') ? parseInt(localStorage.getItem('upgrades')) : 0;
let clickValue = 0.01 + upgrades * 0.1;
let usedPromoCodes = localStorage.getItem('usedPromoCodes') ? JSON.parse(localStorage.getItem('usedPromoCodes')) : [];
const promoCodes = {
    "SkQ4R0U5Mkg=": 10000000000  // JD8GE92H
};

function updateBalance(newBalance) {
    localStorage.setItem('balance', newBalance.toFixed(2));
    document.getElementById('balance').textContent = 'Баланс: ' + newBalance.toFixed(2) + ' гривен';
}

function calculateTotalCost(baseCost, quantity, currentCount) {
    let totalCost = 0;
    for (let i = 0; i < quantity; i++) {
        totalCost += baseCost * Math.pow(1.7, currentCount + i);
    }
    return totalCost;
}

document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(2) + ' гривен';
let farmCounters = document.getElementsByClassName('farm-counter');
let farmQuantities = document.getElementsByClassName('farm-quantity');
let farmTotalCosts = document.getElementsByClassName('total-cost');
for (let i = 0; i < farmCounters.length; i++) {
    farmCounters[i].textContent = farms[i];
    farmTotalCosts[i].textContent = 'Итоговая цена: ' + farmBaseCosts[i] + ' гривен';
    farmQuantities[i].addEventListener('input', function () {
        let quantity = parseInt(farmQuantities[i].value);
        let totalCost = calculateTotalCost(farmBaseCosts[i], quantity, farms[i]);
        farmTotalCosts[i].textContent = 'Итоговая цена: ' + totalCost.toFixed(2) + ' гривен';
    });
}

document.getElementById('promo-code-input').addEventListener('input', function () {
    let promoCode = document.getElementById('promo-code-input').value;
    let encodedPromoCode = btoa(promoCode);
    if (promoCodes.hasOwnProperty(encodedPromoCode) && !usedPromoCodes.includes(encodedPromoCode)) {
        document.getElementById('activate-promo-code').disabled = false;
    } else {
        document.getElementById('activate-promo-code').disabled = true;
    }
});

document.getElementById('activate-promo-code').addEventListener('click', function () {
    let promoCode = document.getElementById('promo-code-input').value;
    let encodedPromoCode = btoa(promoCode);
    if (promoCodes.hasOwnProperty(encodedPromoCode) && !usedPromoCodes.includes(encodedPromoCode)) {
        balance += promoCodes[encodedPromoCode];
        updateBalance(balance);
        usedPromoCodes.push(encodedPromoCode);
        localStorage.setItem('usedPromoCodes', JSON.stringify(usedPromoCodes));
        document.getElementById('promo-code-input').value = '';
        document.getElementById('activate-promo-code').disabled = true;
    }
});

document.getElementById('clicker-button').addEventListener('click', function () {
    balance += clickValue;
    updateBalance(balance);
});

document.getElementById('toggle-shop').addEventListener('click', function () {
    document.getElementById('shop').classList.toggle('hidden');
    document.getElementById('shop').classList.toggle('visible');
});

let buyFarmButtons = document.getElementsByClassName('buy-farm');
for (let i = 0; i < buyFarmButtons.length; i++) {
    buyFarmButtons[i].addEventListener('click', function () {
        let quantity = parseInt(farmQuantities[i].value);
        let totalCost = calculateTotalCost(farmBaseCosts[i], quantity, farms[i]);
        if (balance >= totalCost) {
            balance -= totalCost;
            farms[i] += quantity;
            updateBalance(balance);
            farmCounters[i].textContent = farms[i];
            farmTotalCosts[i].textContent = 'Итоговая цена: ' + calculateTotalCost(farmBaseCosts[i], 1, farms[i]).toFixed(2) + ' гривен';
            localStorage.setItem('farms', JSON.stringify(farms));
        }
    });
}

let upgradeCounter = document.getElementsByClassName('upgrade-counter')[0];
let upgradeQuantity = document.getElementsByClassName('upgrade-quantity')[0];
let upgradeTotalCost = document.getElementsByClassName('total-cost')[3];
let upgradeCost = 1 * Math.pow(2, upgrades);
document.getElementsByClassName('upgrade-cost')[0].textContent = upgradeCost.toFixed(2) + ' гривен (добавляет 0.1 к клику)';
upgradeTotalCost.textContent = 'Итоговая цена: ' + upgradeCost.toFixed(2) + ' гривен';
upgradeCounter.textContent = upgrades;

upgradeQuantity.addEventListener('input', function () {
    let quantity = parseInt(upgradeQuantity.value);
    let totalCost = 0;
    for (let i = 0; i < quantity; i++) {
        totalCost += 1 * Math.pow(2, upgrades + i);
    }
    upgradeTotalCost.textContent = 'Итоговая цена: ' + totalCost.toFixed(2) + ' гривен';
});

document.getElementsByClassName('buy-upgrade')[0].addEventListener('click', function () {
    let quantity = parseInt(upgradeQuantity.value);
    let totalCost = 0;
    for (let i = 0; i < quantity; i++) {
        totalCost += 1 * Math.pow(2, upgrades + i);
    }
    if (balance >= totalCost) {
        balance -= totalCost;
        upgrades += quantity;
        clickValue = 0.01 + upgrades * 0.1;
        updateBalance(balance);
        upgradeCounter.textContent = upgrades;
        upgradeTotalCost.textContent = 'Итоговая цена: ' + (1 * Math.pow(2, upgrades)).toFixed(2) + ' гривен';
        document.getElementsByClassName('upgrade-cost')[0].textContent = (1 * Math.pow(2, upgrades)).toFixed(2) + ' гривен (добавляет 0.1 к клику)';
        localStorage.setItem('upgrades', upgrades);
    }
});

document.getElementById('reset-button').addEventListener('click', function () {
    if (confirm('Вы уверены, что хотите обнулить всё?')) {
        balance = 1;
        farms = [0, 0, 0];
        upgrades = 0;
        clickValue = 0.01;
        usedPromoCodes = [];
        localStorage.clear();
        document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(2) + ' гривен';
        for (let i = 0; i < farmCounters.length; i++) {
            farmCounters[i].textContent = farms[i];
            farmTotalCosts[i].textContent = 'Итоговая цена: ' + farmBaseCosts[i] + ' гривен';
        }
        upgradeCounter.textContent = upgrades;
        upgradeTotalCost.textContent = 'Итоговая цена: ' + (1 * Math.pow(2, upgrades)).toFixed(2) + ' гривен';
        document.getElementsByClassName('upgrade-cost')[0].textContent = (1 * Math.pow(2, upgrades)).toFixed(2) + ' гривен (добавляет 0.1 к клику)';
    }
});
