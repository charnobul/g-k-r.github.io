let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 0;
let initialBonusClaimed = localStorage.getItem('initialBonusClaimed') === 'true';

// Обновляем баланс при загрузке страницы
document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';

document.getElementById('clicker-button').addEventListener('click', function() {
    balance += 0.001;
    document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
    localStorage.setItem('balance', balance.toFixed(3));
});

document.getElementById('initial-bonus').addEventListener('click', function() {
    if (!initialBonusClaimed) {
        balance += 1; // Добавляем начальный бонус
        document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
        localStorage.setItem('balance', balance.toFixed(3));
        localStorage.setItem('initialBonusClaimed', 'true');
    }
});
